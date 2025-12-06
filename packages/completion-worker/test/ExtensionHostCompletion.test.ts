import { test, expect } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { executeCompletionProvider, executeResolveCompletionItem } from '../src/parts/ExtensionHostCompletion/ExtensionHostCompletion.ts'

test('executeCompletionProvider returns empty array when no completions', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.execute': () => [],
  })

  const result: readonly CompletionItem[] = await executeCompletionProvider(1, 'typescript', 10)
  expect(result).toEqual([])

  expect(mockEditorRpc.invocations).toEqual([['ActivateByEvent.activateByEvent', 'onCompletion:typescript']])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.execute', 1, 10]])
})

test('executeCompletionProvider returns completion items when available', async () => {
  const mockCompletions: CompletionItem[] = [
    { flags: 0, kind: 1, label: 'test1', matches: [] },
    { flags: 1, kind: 2, label: 'test2', matches: [0, 1] },
  ]
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.execute': () => mockCompletions,
  })

  const result: readonly CompletionItem[] = await executeCompletionProvider(1, 'typescript', 10)
  expect(result).toEqual(mockCompletions)

  expect(mockEditorRpc.invocations).toEqual([['ActivateByEvent.activateByEvent', 'onCompletion:typescript']])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.execute', 1, 10]])
})

test('executeCompletionProvider handles error from extension host', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.execute': () => {
      throw new Error('Extension host error')
    },
  })

  await expect(executeCompletionProvider(1, 'typescript', 10)).rejects.toThrow('Extension host error')

  expect(mockEditorRpc.invocations).toEqual([['ActivateByEvent.activateByEvent', 'onCompletion:typescript']])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.execute', 1, 10]])
})

test('executeResolveCompletionItem returns resolved completion item', async () => {
  const mockResolvedItem = { detail: 'test detail', resolved: true }
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.executeResolve': () => mockResolvedItem,
  })

  const completionItem: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const result = await executeResolveCompletionItem(1, 10, 'test', completionItem)
  expect(result).toEqual(mockResolvedItem)

  expect(mockEditorRpc.invocations).toEqual([['ActivateByEvent.activateByEvent', 'onCompletion:undefined']])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.executeResolve', 1, 10, 'test', completionItem]])
})

test('executeResolveCompletionItem returns undefined when no provider found', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.executeResolve': () => undefined,
  })

  const completionItem: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const result = await executeResolveCompletionItem(1, 10, 'test', completionItem)
  expect(result).toBeUndefined()

  expect(mockEditorRpc.invocations).toEqual([['ActivateByEvent.activateByEvent', 'onCompletion:undefined']])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.executeResolve', 1, 10, 'test', completionItem]])
})
