import { test, expect } from '@jest/globals'
import { EditorWorker, ExtensionHost, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { executeCompletionProvider, executeResolveCompletionItem } from '../src/parts/ExtensionManagementCompletion/ExtensionManagementCompletion.ts'

const textDocument = {
  documentId: 1,
  languageId: 'typescript',
  text: 'const test = 1',
  uri: 'file:///test.ts',
}

test('executeCompletionProvider returns empty array when no completions', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.execute': () => {
      throw new Error('should not use extension host worker')
    },
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCompletionProvider': () => [],
  })

  const result: readonly CompletionItem[] = await executeCompletionProvider(1, 'typescript', 10)
  expect(result).toEqual([])

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.executeCompletionProvider', textDocument, 10]])
  expect(mockExtensionHostRpc.invocations).toEqual([])
})

test('executeCompletionProvider returns completion items when available', async () => {
  const mockCompletions: CompletionItem[] = [
    { flags: 0, kind: 1, label: 'test1', matches: [] },
    { flags: 1, kind: 2, label: 'test2', matches: [0, 1] },
  ]
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.execute': () => {
      throw new Error('should not use extension host worker')
    },
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCompletionProvider': () => mockCompletions,
  })

  const result: readonly CompletionItem[] = await executeCompletionProvider(1, 'typescript', 10)
  expect(result).toEqual(mockCompletions)

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.executeCompletionProvider', textDocument, 10]])
  expect(mockExtensionHostRpc.invocations).toEqual([])
})

test('executeCompletionProvider handles error from extension management worker', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.execute': () => {
      throw new Error('should not use extension host worker')
    },
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCompletionProvider': () => {
      throw new Error('Extension management worker error')
    },
  })

  await expect(executeCompletionProvider(1, 'typescript', 10)).rejects.toThrow('Extension management worker error')

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.executeCompletionProvider', textDocument, 10]])
  expect(mockExtensionHostRpc.invocations).toEqual([])
})

test('executeResolveCompletionItem returns resolved completion item', async () => {
  const mockResolvedItem = { detail: 'test detail', resolved: true }
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.executeResolve': () => {
      throw new Error('should not use extension host worker')
    },
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeResolveCompletionItemProvider': () => mockResolvedItem,
  })

  const completionItem: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const result = await executeResolveCompletionItem(1, 10, 'test', completionItem)
  expect(result).toEqual(mockResolvedItem)

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLanguageId', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.executeResolveCompletionItemProvider', textDocument, 10, 'test', completionItem]])
  expect(mockExtensionHostRpc.invocations).toEqual([])
})

test('executeResolveCompletionItem returns undefined when no provider found', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.executeResolve': () => {
      throw new Error('should not use extension host worker')
    },
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeResolveCompletionItemProvider': () => undefined,
  })

  const completionItem: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const result = await executeResolveCompletionItem(1, 10, 'test', completionItem)
  expect(result).toBeUndefined()

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLanguageId', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.executeResolveCompletionItemProvider', textDocument, 10, 'test', completionItem]])
  expect(mockExtensionHostRpc.invocations).toEqual([])
})
