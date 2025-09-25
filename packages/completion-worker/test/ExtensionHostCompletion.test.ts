import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker, ExtensionHost } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { executeCompletionProvider, executeResolveCompletionItem } from '../src/parts/ExtensionHostCompletion/ExtensionHostCompletion.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'

test('executeCompletionProvider returns empty array when no completions', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHostCompletion.execute': () => [],
  })

  const result: readonly CompletionItem[] = await executeCompletionProvider(1, 'typescript', 10)
  expect(result).toEqual([])
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
})

test('executeResolveCompletionItem returns undefined when no provider found', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ActivateByEvent.activateByEvent') {
        return
      }
      if (method === 'ExtensionHostCompletion.executeResolve') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.executeResolve') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const completionItem: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [] }
  const result = await executeResolveCompletionItem(1, 10, 'test', completionItem)
  expect(result).toBeUndefined()
})
