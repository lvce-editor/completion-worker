import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import { executeCompletionProvider, executeResolveCompletionItem } from '../src/parts/ExtensionHostCompletion/ExtensionHostCompletion.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'

test('executeCompletionProvider returns empty array when no completions', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ActivateByEvent.activateByEvent') {
        return
      }
      if (method === 'ExtensionHostCompletion.execute') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.execute') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const result: readonly CompletionItem[] = await executeCompletionProvider(1, 'typescript', 10)
  expect(result).toEqual([])
})

test('executeCompletionProvider returns completion items when available', async () => {
  const mockCompletions: CompletionItem[] = [
    { label: 'test1', kind: 1, flags: 0, matches: [] },
    { label: 'test2', kind: 2, flags: 1, matches: [0, 1] },
  ]
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ActivateByEvent.activateByEvent') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.execute') {
        return mockCompletions
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const result: readonly CompletionItem[] = await executeCompletionProvider(1, 'typescript', 10)
  expect(result).toEqual(mockCompletions)
})

test('executeCompletionProvider handles error from extension host', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ActivateByEvent.activateByEvent') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.execute') {
        throw new Error('Extension host error')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  await expect(executeCompletionProvider(1, 'typescript', 10)).rejects.toThrow('Extension host error')
})

test('executeResolveCompletionItem returns resolved completion item', async () => {
  const mockResolvedItem = { resolved: true, detail: 'test detail' }
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ActivateByEvent.activateByEvent') {
        return
      }
      if (method === 'ExtensionHostCompletion.executeResolve') {
        return mockResolvedItem
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.executeResolve') {
        return mockResolvedItem
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

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
