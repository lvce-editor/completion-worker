import { ExtensionHost } from '@lvce-editor/rpc-registry'

export const { invoke, set, dispose } = ExtensionHost
export const registerMockRpc = (ExtensionHost as any).registerMockRpc

export { type MockRpc } from '@lvce-editor/rpc'
