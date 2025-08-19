import * as ActivateByEvent from '../ActivateByEvent/ActivateByEvent.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

export const execute = async ({ editorLanguageId, editorUid, args, event, method }: any) => {
  const fullEvent = `${event}:${editorLanguageId}`
  await ActivateByEvent.activateByEvent(fullEvent)
  const result = await ExtensionHostWorker.invoke(method, editorUid, ...args)
  return result
}
