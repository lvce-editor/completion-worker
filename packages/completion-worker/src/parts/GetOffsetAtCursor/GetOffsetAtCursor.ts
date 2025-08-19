import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const getOffsetAtCursor = async (editorUid: number): Promise<number> => {
  return EditorWorker.getOffsetAtCursor(editorUid)
}
