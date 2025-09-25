import { test, expect } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { createExtensionHostRpc } from '../src/parts/CreateExtensionHostRpc/CreateExtensionHostRpc.ts'

test('createExtensionHostRpc creates rpc successfully', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => undefined,
  })

  const result = await createExtensionHostRpc()
  expect(result).toBeDefined()

  expect(mockRpc.invocations).toBeDefined()
  await result.dispose()
})

test('createExtensionHostRpc throws VError when port creation fails', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => {
      throw new Error('Port creation failed')
    },
  })

  await expect(createExtensionHostRpc()).rejects.toThrow('Failed to create extension host rpc')

  expect(mockRpc.invocations).toBeDefined()
})
