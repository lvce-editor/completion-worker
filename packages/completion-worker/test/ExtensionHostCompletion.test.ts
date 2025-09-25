import { test, expect } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { executeCompletionProvider, executeResolveCompletionItem } from '../src/parts/ExtensionHostCompletion/ExtensionHostCompletion.ts'
import * as import { ExtensionHost}  from '@lvce-editor/rpc-registry'


test('executeCompletionProvider returns empty array when no completions', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHostCompletion.execute': () => [],
  })

  const result: readonly CompletionItem[] = await executeCompletionProvider(1, 'typescript', 10)
  expect(result).toEqual([])

  expect(mockEditorRpc.invocations).toEqual([['ActivateByEvent.activateByEvent', 'onCompletion:typescript']])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.execute', 1, 10]])
})

test('executeCompletionProvider returns completion items when available', async () => {
  const mockCompletions: CompletionItem[] = [
    { label: 'test1', kind: 1, flags: 0, matches: [] },
    { label: 'test2', kind: 2, flags: 1, matches: [0, 1] },
  ]
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
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
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHostCompletion.execute': () => {
      throw new Error('Extension host error')
    },
  })

  await expect(executeCompletionProvider(1, 'typescript', 10)).rejects.toThrow('Extension host error')

  expect(mockEditorRpc.invocations).toEqual([['ActivateByEvent.activateByEvent', 'onCompletion:typescript']])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.execute', 1, 10]])
})

test('executeResolveCompletionItem returns resolved completion item', async () => {
  const mockResolvedItem = { resolved: true, detail: 'test detail' }
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHostCompletion.executeResolve': () => mockResolvedItem,
  })

  const completionItem: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [] }
  const result = await executeResolveCompletionItem(1, 10, 'test', completionItem)
  expect(result).toEqual(mockResolvedItem)

  expect(mockEditorRpc.invocations).toEqual([['ActivateByEvent.activateByEvent', 'onCompletion:undefined']])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.executeResolve', 1, 10, 'test', completionItem]])
})

test('executeResolveCompletionItem returns undefined when no provider found', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHostCompletion.executeResolve': () => undefined,
  })

  const completionItem: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [] }
  const result = await executeResolveCompletionItem(1, 10, 'test', completionItem)
  expect(result).toBeUndefined()

  expect(mockEditorRpc.invocations).toEqual([['ActivateByEvent.activateByEvent', 'onCompletion:undefined']])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.executeResolve', 1, 10, 'test', completionItem]])
})
