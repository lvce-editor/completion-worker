import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker, RpcId } from '@lvce-editor/rpc-registry'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker') {
        return Promise.resolve(undefined)
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker') {
        return Promise.resolve(undefined)
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  await initialize()
  const rpc = RpcRegistry.get(RpcId.ExtensionHostWorker)
  expect(rpc).toBeDefined()
  await rpc.dispose()
})
