import { test, expect } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize sets extension host worker rpc', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => [],
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => undefined,
  })
  ExtensionHostWorker.set(mockRpc)

  await initialize()
  await ExtensionHostWorker.dispose()
  
  expect(mockRpc.invocations.length).toBe(1)
  expect(mockRpc.invocations[0]).toEqual(['FileSystem.readDirWithFileTypes'])
})
