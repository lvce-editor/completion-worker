import { expect, test } from '@jest/globals'
import { EditorWorker, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { getEdits } from '../src/parts/GetEdits/GetEdits.ts'

const createCompletionItem = (label: string, snippet?: string): CompletionItem => ({
  flags: 0,
  kind: 1,
  label,
  matches: [],
  ...(snippet && { snippet }),
})

const textDocument = {
  documentId: 1,
  languageId: 'typescript',
  text: 'const hel',
  uri: 'file:///test.ts',
}

test('getEdits - returns changes for simple completion', async () => {
  const mockLines = ['const hel']
  const mockSelections = [0, 5]
  const mockCompletion = createCompletionItem('hello')

  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => mockLines,
    'Editor.getOffsetAtCursor': () => 10,
    'Editor.getSelections2': () => mockSelections,
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => undefined,
  })

  const result = await getEdits(1, 'hel', mockCompletion, 'test-application')
  expect(result).toEqual({
    changes: [
      {
        deleted: ['nst'],
        end: { columnIndex: 5, rowIndex: 0 },
        inserted: ['hello'],
        origin: '',
        start: { columnIndex: 2, rowIndex: 0 },
      },
    ],
    selectionChanges: undefined,
  })

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['Editor.getLanguageId', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
    ['Editor.getLines2', 1],
    ['Editor.getSelections2', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([
    [
      'Extensions.invokeForApplication',
      'test-application',
      'Extensions.executeResolveCompletionItemProvider',
      textDocument,
      10,
      'hello',
      mockCompletion,
    ],
  ])
})

test('getEdits - replaces the identifier suffix after the cursor', async () => {
  const identifier = 'closeAllEditors'
  const line = `Main.${identifier}${identifier.slice(10)}()`
  const cursorColumn = 'Main.closeAllEditors'.length
  const completionItem = createCompletionItem('closeAllEditors')

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => [line],
    'Editor.getOffsetAtCursor': () => cursorColumn,
    'Editor.getSelections2': () => [0, cursorColumn],
    'Editor.getUri': () => 'file:///test.ts',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => undefined,
  })

  await expect(getEdits(1, 'closeAllEditors', completionItem, 'test-application')).resolves.toEqual({
    changes: [
      {
        deleted: [`${identifier}${identifier.slice(10)}`],
        end: { columnIndex: line.indexOf('()'), rowIndex: 0 },
        inserted: ['closeAllEditors'],
        origin: '',
        start: { columnIndex: 'Main.'.length, rowIndex: 0 },
      },
    ],
    selectionChanges: undefined,
  })
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})

test('getEdits - replaces the identifier at its end and preserves existing call parentheses', async () => {
  const line = 'Main.closeAllEditor()'
  const cursorColumn = line.indexOf('()')
  const completionItem = createCompletionItem('closeAllEditors')

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => [line],
    'Editor.getOffsetAtCursor': () => cursorColumn,
    'Editor.getSelections2': () => [0, cursorColumn],
    'Editor.getUri': () => 'file:///test.ts',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => ({ snippet: 'closeAllEditors()' }),
  })

  await expect(getEdits(1, 'closeAllEditor', completionItem, 'test-application')).resolves.toEqual({
    changes: [
      {
        deleted: ['closeAllEditor'],
        end: { columnIndex: cursorColumn, rowIndex: 0 },
        inserted: ['closeAllEditors'],
        origin: '',
        start: { columnIndex: 'Main.'.length, rowIndex: 0 },
      },
    ],
    selectionChanges: undefined,
  })
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})

test('getEdits - uses a provider replacement range when supplied', async () => {
  const line = 'Main.closeAllEditors()'
  const cursorColumn = line.indexOf('()')
  const completionItem: CompletionItem = {
    ...createCompletionItem('closeAllEditors'),
    replacementRange: {
      endOffset: cursorColumn,
      startOffset: 'Main.'.length,
    },
  }

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => [line],
    'Editor.getOffsetAtCursor': () => cursorColumn,
    'Editor.getSelections2': () => [0, cursorColumn],
    'Editor.getUri': () => 'file:///test.ts',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => undefined,
  })

  await expect(getEdits(1, 'close', completionItem, 'test-application')).resolves.toEqual({
    changes: [
      {
        deleted: ['closeAllEditors'],
        end: { columnIndex: cursorColumn, rowIndex: 0 },
        inserted: ['closeAllEditors'],
        origin: '',
        start: { columnIndex: 'Main.'.length, rowIndex: 0 },
      },
    ],
    selectionChanges: undefined,
  })
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})

test('getEdits - converts a provider replacement range across lines', async () => {
  const lines = ['const closeAll', 'Editors()']
  const cursorColumn = 7
  const completionItem: CompletionItem = {
    ...createCompletionItem('closeAllEditors'),
    replacementRange: { endOffset: 22, startOffset: 6 },
  }

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => lines,
    'Editor.getOffsetAtCursor': () => 22,
    'Editor.getSelections2': () => [1, cursorColumn],
    'Editor.getUri': () => 'file:///test.ts',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => undefined,
  })

  await expect(getEdits(1, 'Editors', completionItem, 'test-application')).resolves.toEqual({
    changes: [
      {
        deleted: ['closeAll', 'Editors'],
        end: { columnIndex: cursorColumn, rowIndex: 1 },
        inserted: ['closeAllEditors'],
        origin: '',
        start: { columnIndex: 6, rowIndex: 0 },
      },
    ],
    selectionChanges: undefined,
  })
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})

test('getEdits - ignores an invalid provider range and replaces the identifier suffix', async () => {
  const identifier = 'closeAllEditors'
  const line = `Main.${identifier}${identifier.slice(10)}()`
  const cursorColumn = 'Main.closeAllEditors'.length
  const completionItem: CompletionItem = {
    ...createCompletionItem('closeAllEditors'),
    replacementRange: { endOffset: cursorColumn - 1, startOffset: cursorColumn + 1 },
  }

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => [line],
    'Editor.getOffsetAtCursor': () => cursorColumn,
    'Editor.getSelections2': () => [0, cursorColumn],
    'Editor.getUri': () => 'file:///test.ts',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => undefined,
  })

  await expect(getEdits(1, 'closeAllEditors', completionItem, 'test-application')).resolves.toMatchObject({
    changes: [
      {
        deleted: [`${identifier}${identifier.slice(10)}`],
        end: { columnIndex: line.indexOf('()'), rowIndex: 0 },
        start: { columnIndex: 'Main.'.length, rowIndex: 0 },
      },
    ],
  })
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})

test('getEdits - replaces astral Unicode identifier continuations', async () => {
  const letter = '𐐀'
  const identifier = 'closeAllEditors'
  const completionLabel = `${letter}${identifier}`
  const line = `${completionLabel}${letter}()`
  const cursorColumn = completionLabel.length
  const completionItem = createCompletionItem(completionLabel)

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => [line],
    'Editor.getOffsetAtCursor': () => cursorColumn,
    'Editor.getSelections2': () => [0, cursorColumn],
    'Editor.getUri': () => 'file:///test.ts',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => undefined,
  })

  await expect(getEdits(1, completionLabel, completionItem, 'test-application')).resolves.toMatchObject({
    changes: [
      {
        deleted: [`${letter}closeAllEditors${letter}`],
        end: { columnIndex: line.indexOf('()'), rowIndex: 0 },
        inserted: [completionLabel],
        start: { columnIndex: 0, rowIndex: 0 },
      },
    ],
  })
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})

test('getEdits - falls back when a provider range extends beyond the document', async () => {
  const line = 'const hello'
  const completionItem: CompletionItem = {
    ...createCompletionItem('helloThere'),
    replacementRange: { endOffset: 100, startOffset: 6 },
  }

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => [line],
    'Editor.getOffsetAtCursor': () => line.length,
    'Editor.getSelections2': () => [0, line.length],
    'Editor.getUri': () => 'file:///test.ts',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => undefined,
  })

  await expect(getEdits(1, 'hello', completionItem, 'test-application')).resolves.toMatchObject({
    changes: [
      {
        deleted: ['hello'],
        end: { columnIndex: line.length, rowIndex: 0 },
        inserted: ['helloThere'],
        start: { columnIndex: 6, rowIndex: 0 },
      },
    ],
  })
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})

test('getEdits - returns changes and selection from a resolved completion', async () => {
  const mockLines = ['  ena']
  const mockSelections = [0, 5]
  const mockCompletion = createCompletionItem('enabled', 'enabled original')

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'json',
    'Editor.getLines2': () => mockLines,
    'Editor.getOffsetAtCursor': () => 5,
    'Editor.getSelections2': () => mockSelections,
    'Editor.getUri': () => 'file:///settings.json',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => ({
      selectionRange: { endOffset: 15, startOffset: 11 },
      snippet: '"enabled": true',
    }),
  })

  await expect(getEdits(1, 'ena', mockCompletion, 'test-application')).resolves.toEqual({
    changes: [
      {
        deleted: ['ena'],
        end: { columnIndex: 5, rowIndex: 0 },
        inserted: ['"enabled": true'],
        origin: '',
        start: { columnIndex: 2, rowIndex: 0 },
      },
    ],
    selectionChanges: new Uint32Array([0, 13, 0, 17]),
  })
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})

test('getEdits - replaces a complete dotted JSON property prefix', async () => {
  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'json',
    'Editor.getLines2': () => ['  simpleBrowser.wo'],
    'Editor.getOffsetAtCursor': () => 18,
    'Editor.getSelections2': () => [0, 18],
    'Editor.getUri': () => 'file:///settings.json',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => ({
      snippet: '"simpleBrowser.workflows"',
    }),
  })

  const result = await getEdits(1, 'simpleBrowser.wo', createCompletionItem('simpleBrowser.workflows'), 'test-application')

  expect(result.changes).toEqual([
    {
      deleted: ['simpleBrowser.wo'],
      end: { columnIndex: 18, rowIndex: 0 },
      inserted: ['"simpleBrowser.workflows"'],
      origin: '',
      start: { columnIndex: 2, rowIndex: 0 },
    },
  ])
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})

test('getEdits - splits multiline snippets and maps multiline selections', async () => {
  const mockCompletion = createCompletionItem('block')

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'test',
    'Editor.getLines2': () => ['  blo'],
    'Editor.getOffsetAtCursor': () => 5,
    'Editor.getSelections2': () => [0, 5],
    'Editor.getUri': () => 'file:///test.xyz',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => ({
      selectionRange: { endOffset: 12, startOffset: 6 },
      snippet: 'first\nsecond\nthird',
    }),
  })

  await expect(getEdits(1, 'blo', mockCompletion, 'test-application')).resolves.toEqual({
    changes: [
      {
        deleted: ['blo'],
        end: { columnIndex: 5, rowIndex: 0 },
        inserted: ['first', 'second', 'third'],
        origin: '',
        start: { columnIndex: 2, rowIndex: 0 },
      },
    ],
    selectionChanges: new Uint32Array([1, 0, 1, 6]),
  })
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})

test('getEdits - returns changes when resolved item is undefined', async () => {
  const mockLines = ['const hel']
  const mockSelections = [0, 5]
  const mockCompletion = createCompletionItem('hello')

  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => mockLines,
    'Editor.getOffsetAtCursor': () => 10,
    'Editor.getSelections2': () => mockSelections,
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => undefined,
  })

  const result = await getEdits(1, 'hel', mockCompletion, 'test-application')
  expect(result).toEqual({
    changes: [
      {
        deleted: ['nst'],
        end: { columnIndex: 5, rowIndex: 0 },
        inserted: ['hello'],
        origin: '',
        start: { columnIndex: 2, rowIndex: 0 },
      },
    ],
    selectionChanges: undefined,
  })

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['Editor.getLanguageId', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
    ['Editor.getLines2', 1],
    ['Editor.getSelections2', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([
    [
      'Extensions.invokeForApplication',
      'test-application',
      'Extensions.executeResolveCompletionItemProvider',
      textDocument,
      10,
      'hello',
      mockCompletion,
    ],
  ])
})

test('getEdits - returns changes with original snippet when unresolved', async () => {
  const mockCompletion = createCompletionItem('display', 'display: ')

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'css',
    'Editor.getLines2': () => ['h1 { display'],
    'Editor.getOffsetAtCursor': () => 12,
    'Editor.getSelections2': () => [0, 12],
    'Editor.getUri': () => 'file:///test.css',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => undefined,
  })

  await expect(getEdits(1, 'display', mockCompletion, 'test-application')).resolves.toEqual({
    changes: [
      {
        deleted: ['display'],
        end: { columnIndex: 12, rowIndex: 0 },
        inserted: ['display: '],
        origin: '',
        start: { columnIndex: 5, rowIndex: 0 },
      },
    ],
    selectionChanges: undefined,
  })
  expect(mockEditorRpc.invocations).toHaveLength(6)
  expect(mockExtensionManagementRpc.invocations).toHaveLength(1)
})
