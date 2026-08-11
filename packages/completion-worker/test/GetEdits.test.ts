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
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    deleted: ['nst'],
    end: { columnIndex: 5, rowIndex: 0 },
    inserted: ['hello'],
    origin: '',
    start: { columnIndex: 2, rowIndex: 0 },
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

test.todo('getEdits - returns changes with resolved snippet')

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
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    deleted: ['nst'],
    end: { columnIndex: 5, rowIndex: 0 },
    inserted: ['hello'],
    origin: '',
    start: { columnIndex: 2, rowIndex: 0 },
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

test('getEdits - replaces a dotted prefix that matches the completion label', async () => {
  const mockLines = ['v26.']
  const mockSelections = [0, 4]
  const mockCompletion = createCompletionItem('v26.7.0')

  EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'nvmrc',
    'Editor.getLines2': () => mockLines,
    'Editor.getOffsetAtCursor': () => 4,
    'Editor.getSelections2': () => mockSelections,
    'Editor.getUri': () => 'file:///test/.nvmrc',
  })
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeResolveCompletionItemProvider': () => undefined,
  })

  const result = await getEdits(1, '', mockCompletion)

  expect(result).toEqual([
    {
      deleted: ['v26.'],
      end: { columnIndex: 4, rowIndex: 0 },
      inserted: ['v26.7.0'],
      origin: '',
      start: { columnIndex: 0, rowIndex: 0 },
    },
  ])
})

test('getEdits - keeps a non-matching dotted prefix', async () => {
  const mockLines = ['object.']
  const mockSelections = [0, 7]
  const mockCompletion = createCompletionItem('property')

  EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => mockLines,
    'Editor.getOffsetAtCursor': () => 7,
    'Editor.getSelections2': () => mockSelections,
    'Editor.getUri': () => 'file:///test.ts',
  })
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeResolveCompletionItemProvider': () => undefined,
  })

  const result = await getEdits(1, '', mockCompletion)

  expect(result).toEqual([
    {
      deleted: [''],
      end: { columnIndex: 7, rowIndex: 0 },
      inserted: ['property'],
      origin: '',
      start: { columnIndex: 7, rowIndex: 0 },
    },
  ])
})
