import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { EditorWorker, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'

const send = async (port: MessagePort): Promise<void> => {
  // TODO
  await EditorWorker.sendMessagePortToExtensionHostWorker(port)
}

export const initializeExtensionManagementWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: CommandMap.commandMap,
    send,
  })
  ExtensionManagementWorker.set(rpc)
}
