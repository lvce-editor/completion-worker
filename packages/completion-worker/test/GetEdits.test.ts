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
