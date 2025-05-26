import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort2'
  // @ts-ignore
  await EditorWorker.invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', port, command, RpcId.DebugWorker)
}
