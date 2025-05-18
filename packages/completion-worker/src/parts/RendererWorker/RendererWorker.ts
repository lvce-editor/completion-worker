import * as Rpc from '../Rpc/Rpc.ts'

export const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  return Rpc.invoke('WebView.compatRendererWorkerInvoke', method, ...params)
}

export const invokeAndTransfer = async (method: string, ...params: readonly any[]): Promise<any> => {
  return Rpc.invokeAndTransfer('WebView.compatRendererWorkerInvokeAndTransfer', method, ...params)
}
