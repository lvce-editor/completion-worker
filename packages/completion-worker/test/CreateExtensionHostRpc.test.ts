import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createExtensionHostRpc } from '../src/parts/CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'

test('createExtensionHostRpc creates rpc successfully', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const result = await createExtensionHostRpc()
  expect(result).toBeDefined()

  await result.dispose()
})

test('createExtensionHostRpc throws VError when port creation fails', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {
      throw new Error('Port creation failed')
    },
    invokeAndTransfer: () => {
      throw new Error('Port creation failed')
    },
  })
  EditorWorker.set(mockRpc)

  await expect(createExtensionHostRpc()).rejects.toThrow('Failed to create extension host rpc')
})
