import { test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import * as SendMessagePortToExtensionHostWorker from '../src/parts/SendMessagePortToExtensionHostWorker/SendMessagePortToExtensionHostWorker.ts'

test('sendMessagePortToEmbedsProcess sends port to embeds process', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)
  const { port1 } = new MessageChannel()
  await SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker(port1)
})
