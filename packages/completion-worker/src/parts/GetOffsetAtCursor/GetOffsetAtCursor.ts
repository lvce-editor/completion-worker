import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const getOffsetAtCursor = async (editorUid: any): Promise<number> => {
  // TODO ask editor worker
  // @ts-ignore
  return EditorWorker.invoke('Editor.getOffsetAtCursor', editorUid)
}
