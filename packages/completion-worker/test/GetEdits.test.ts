import { expect, test } from '@jest/globals'
import { EditorWorker, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { getEdits } from '../src/parts/GetEdits/GetEdits.ts'

const createCompletionItem = (label: string): CompletionItem => ({
  flags: 0,
  kind: 1,
  label,
  matches: [],
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
    'Extensions.executeResolveCompletionItemProvider': () => undefined,
  })

  const result = await getEdits(1, 'hel', mockCompletion)
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
    ['Extensions.executeResolveCompletionItemProvider', textDocument, 10, 'hello', mockCompletion],
  ])
})

test('getEdits - returns changes and selection from a resolved completion', async () => {
  const mockLines = ['  ena']
  const mockSelections = [0, 5]
  const mockCompletion = createCompletionItem('enabled')

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'json',
    'Editor.getLines2': () => mockLines,
    'Editor.getOffsetAtCursor': () => 5,
    'Editor.getSelections2': () => mockSelections,
    'Editor.getUri': () => 'file:///settings.json',
  })
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeResolveCompletionItemProvider': () => ({
      selectionRange: { endOffset: 15, startOffset: 11 },
      snippet: '"enabled": true',
    }),
  })

  await expect(getEdits(1, 'ena', mockCompletion)).resolves.toEqual({
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
    'Extensions.executeResolveCompletionItemProvider': () => ({
      selectionRange: { endOffset: 12, startOffset: 6 },
      snippet: 'first\nsecond\nthird',
    }),
  })

  await expect(getEdits(1, 'blo', mockCompletion)).resolves.toEqual({
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
    'Extensions.executeResolveCompletionItemProvider': () => undefined,
  })

  const result = await getEdits(1, 'hel', mockCompletion)
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
    ['Extensions.executeResolveCompletionItemProvider', textDocument, 10, 'hello', mockCompletion],
  ])
})
