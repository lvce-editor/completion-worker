import * as CreateExtensionHostRpc from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

export const initialize = async (): Promise<void> => {
  const rpc = await CreateExtensionHostRpc.createExtensionHostRpc()
  ExtensionHostWorker.set(rpc)
}
