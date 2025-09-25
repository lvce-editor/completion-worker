import { ExtensionHost } from '@lvce-editor/rpc-registry'
import * as ActivateByEvent from '../ActivateByEvent/ActivateByEvent.ts'
;('../ExtensionHostWorker/ExtensionHostWorker.ts')

export const execute = async ({ editorLanguageId, editorUid, args, event, method }: any) => {
  const fullEvent = `${event}:${editorLanguageId}`
  await ActivateByEvent.activateByEvent(fullEvent)
  const result = await ExtensionHostWorker.invoke(method, editorUid, ...args)
  return result
}
