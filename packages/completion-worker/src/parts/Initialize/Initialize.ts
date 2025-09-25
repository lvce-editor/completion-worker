import { ExtensionHost } from '@lvce-editor/rpc-registry'
import * as CreateExtensionHostRpc from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'

export const initialize = async (): Promise<void> => {
  const rpc = await CreateExtensionHostRpc.createExtensionHostRpc()
  ExtensionHost.set(rpc)
}
