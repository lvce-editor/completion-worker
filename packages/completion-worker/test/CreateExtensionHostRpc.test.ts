import { test, expect } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { createExtensionHostRpc } from '../src/parts/CreateExtensionHostRpc/CreateExtensionHostRpc.ts'

test('createExtensionHostRpc creates rpc successfully', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => undefined,
  })

  const result = await createExtensionHostRpc()
  expect(result).toBeDefined()

  // Check invocations before disposing
  const invocations = mockRpc.invocations.slice()
  expect(invocations.length).toBe(1)
  expect(invocations[0]).toEqual(['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker'])

  await result.dispose()
})

test('createExtensionHostRpc throws VError when port creation fails', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => {
      throw new Error('Port creation failed')
    },
  })

  await expect(createExtensionHostRpc()).rejects.toThrow('Failed to create extension host rpc')

  const invocations = mockRpc.invocations.slice()
  expect(invocations.length).toBe(1)
  expect(invocations[0]).toEqual(['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker'])
})
