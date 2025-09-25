import { ExtensionHost } from '@lvce-editor/rpc-registry'

export const { invoke, set, dispose } = ExtensionHost
export const { registerMockRpc } = ExtensionHost as any

export { type MockRpc } from '@lvce-editor/rpc'
