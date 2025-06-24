import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize sets extension host worker rpc', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: async () => {
      return;
    },
  })
  EditorWorker.set(mockRpc)
  ExtensionHostWorker.set(mockRpc)

  await initialize()
  expect(ExtensionHostWorker.invoke).toBeDefined()
})
