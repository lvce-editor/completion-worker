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
    'Extensions.invokeForApplication': () => [],
  })

  const result: readonly CompletionItem[] = await executeCompletionProvider(1, 'typescript', 10, 'test-application')
  expect(result).toEqual([])

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.invokeForApplication', 'test-application', 'Extensions.executeCompletionProvider', textDocument, 10]])
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
    'Extensions.invokeForApplication': () => mockCompletions,
  })

  const result: readonly CompletionItem[] = await executeCompletionProvider(1, 'typescript', 10, 'test-application')
  expect(result).toEqual(mockCompletions)

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.invokeForApplication', 'test-application', 'Extensions.executeCompletionProvider', textDocument, 10]])
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
    'Extensions.invokeForApplication': () => {
      throw new Error('Extension management worker error')
    },
  })

  await expect(executeCompletionProvider(1, 'typescript', 10, 'test-application')).rejects.toThrow('Extension management worker error')

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([['Extensions.invokeForApplication', 'test-application', 'Extensions.executeCompletionProvider', textDocument, 10]])
  expect(mockExtensionHostRpc.invocations).toEqual([])
})

test('executeCompletionProvider preserves application routing', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => [],
  })

  const result = await executeCompletionProvider(1, 'typescript', 10, 'application-1')
  expect(result).toEqual([])
  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([
    ['Extensions.invokeForApplication', 'application-1', 'Extensions.executeCompletionProvider', textDocument, 10],
  ])
})

test('executeCompletionProvider preserves application-scoped errors', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => {
      throw new Error('Application extension management error')
    },
  })

  await expect(executeCompletionProvider(1, 'typescript', 10, 'application-1')).rejects.toThrow('Application extension management error')
  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([
    ['Extensions.invokeForApplication', 'application-1', 'Extensions.executeCompletionProvider', textDocument, 10],
  ])
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
    'Extensions.invokeForApplication': () => mockResolvedItem,
  })

  const completionItem: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const result = await executeResolveCompletionItem(1, 10, 'test', completionItem, 'test-application')
  expect(result).toEqual(mockResolvedItem)

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLanguageId', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([
    ['Extensions.invokeForApplication', 'test-application', 'Extensions.executeResolveCompletionItemProvider', textDocument, 10, 'test', completionItem],
  ])
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
    'Extensions.invokeForApplication': () => undefined,
  })

  const completionItem: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const result = await executeResolveCompletionItem(1, 10, 'test', completionItem, 'test-application')
  expect(result).toBeUndefined()

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLanguageId', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([
    ['Extensions.invokeForApplication', 'test-application', 'Extensions.executeResolveCompletionItemProvider', textDocument, 10, 'test', completionItem],
  ])
  expect(mockExtensionHostRpc.invocations).toEqual([])
})

test('executeResolveCompletionItem preserves application routing and undefined results', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => undefined,
  })

  const completionItem: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const result = await executeResolveCompletionItem(1, 10, 'test', completionItem, 'application-1')
  expect(result).toBeUndefined()
  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getLanguageId', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([
    ['Extensions.invokeForApplication', 'application-1', 'Extensions.executeResolveCompletionItemProvider', textDocument, 10, 'test', completionItem],
  ])
})
