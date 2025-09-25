import { test, expect } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize sets extension host worker rpc', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => [],
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => undefined,
  })
  ExtensionHostWorker.set(mockRpc)

  await initialize()
  await ExtensionHostWorker.dispose()

  expect(mockRpc.invocations).toBeDefined()
})
