import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { RpcId } from '@lvce-editor/rpc-registry'
import { executeCompletionProvider, executeResolveCompletionItem } from '../src/parts/ExtensionHostCompletion/ExtensionHostCompletion.ts'

test.skip('executeCompletionProvider returns empty array when no provider found', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostEditor.execute') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockRpc)

  const result = await executeCompletionProvider(1, 'typescript', 0)
  expect(result).toEqual([])
})

test.skip('executeCompletionProvider returns first result when provider found', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostEditor.execute') {
        return Promise.resolve([['completion1', 'completion2']])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockRpc)

  const result = await executeCompletionProvider(1, 'typescript', 0)
  expect(result).toEqual(['completion1', 'completion2'])
})

test.skip('executeResolveCompletionItem returns undefined when no provider found', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostEditor.execute') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockRpc)

  const result = await executeResolveCompletionItem(1, 0, 'name', {})
  expect(result).toBeUndefined()
})

test.skip('executeResolveCompletionItem returns first result when provider found', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostEditor.execute') {
        return Promise.resolve([{ resolved: true }])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockRpc)

  const result = await executeResolveCompletionItem(1, 0, 'name', {})
  expect(result).toEqual({ resolved: true })
})
