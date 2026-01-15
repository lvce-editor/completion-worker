import { EditorWorker, ExtensionHost } from '@lvce-editor/rpc-registry'

export const execute = async ({ args, editorLanguageId, editorUid, event, method }: any) => {
  const fullEvent = `${event}:${editorLanguageId}`
  await EditorWorker.activateByEvent(fullEvent)
  const result = await ExtensionHost.invoke(method, editorUid, ...args)
  return result
}
