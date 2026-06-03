import { EditorWorker, ExtensionHost } from '@lvce-editor/rpc-registry'

interface ExecuteOptions {
  readonly args: readonly any[]
  readonly combineResults?: (result: any) => any
  readonly editorLanguageId?: string
  readonly editorUid: number
  readonly event: string
  readonly method: string
}

export const execute = async ({ args, editorLanguageId, editorUid, event, method }: ExecuteOptions): Promise<any> => {
  const fullEvent = `${event}:${editorLanguageId}`
  await EditorWorker.activateByEvent(fullEvent)
  const result = await ExtensionHost.invoke(method, editorUid, ...args)
  return result
}
