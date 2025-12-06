import { ExtensionHost } from '@lvce-editor/rpc-registry'
import * as ActivateByEvent from '../ActivateByEvent/ActivateByEvent.ts'

export const execute = async ({ args, editorLanguageId, editorUid, event, method }: any) => {
  const fullEvent = `${event}:${editorLanguageId}`
  await ActivateByEvent.activateByEvent(fullEvent)
  const result = await ExtensionHost.invoke(method, editorUid, ...args)
  return result
}
