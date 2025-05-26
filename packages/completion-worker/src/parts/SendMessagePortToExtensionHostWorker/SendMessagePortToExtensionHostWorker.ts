import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort2'
  // @ts-ignore
  await EditorWorker.invokeAndTransfer(
    // @ts-ignore
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker',
    port,
    command,
    0, // TODO
  )
}
