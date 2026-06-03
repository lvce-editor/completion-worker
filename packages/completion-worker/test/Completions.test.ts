import { expect, jest, test } from '@jest/globals'
import { EditorWorker, ExtensionHost, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { getCompletions } from '../src/parts/Completions/Completions.ts'

const textDocument = {
  documentId: 1,
  languageId: 'typescript',
  text: 'const test = 1',
  uri: 'file:///test.ts',
}

test('getCompletions returns completions successfully', async () => {
  const mockCompletions = [
    {
      flags: 0,
      kind: 1,
      label: 'test',
      matches: [0, 1, 2, 3],
    },
  ]
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.execute': () => {
      throw new Error('should not use extension host worker')
    },
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCompletionProvider': () => mockCompletions,
  })

  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getOffsetAtCursor': () => 0,
    'Editor.getUri': () => 'file:///test.ts',
  })

  const result = await getCompletions(1, 'typescript')
  expect(result).toEqual(mockCompletions)

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.executeCompletionProvider', textDocument, 0]])
  expect(mockExtensionHostRpc.invocations).toEqual([])
})

test('getCompletions returns empty array on error', async () => {
  // @ts-ignore
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.execute': () => {
      throw new Error('should not use extension host worker')
    },
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCompletionProvider': () => {
      throw new Error('test error')
    },
  })

  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getOffsetAtCursor': () => 0,
    'Editor.getUri': () => 'file:///test.ts',
  })

  const result = await getCompletions(1, 'typescript')
  expect(result).toEqual([])
  expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to get completions:')
  expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('test error'))

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.executeCompletionProvider', textDocument, 0]])
  expect(mockExtensionHostRpc.invocations).toEqual([])

  consoleErrorSpy.mockRestore()
})
