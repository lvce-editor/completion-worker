import * as CreateExtensionHostRpc from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
;('../ExtensionHostWorker/ExtensionHostWorker.ts')

export const initialize = async (): Promise<void> => {
  const rpc = await CreateExtensionHostRpc.createExtensionHostRpc()
  ExtensionHostWorker.set(rpc)
}
