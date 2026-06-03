import { EditorWorker } from '@lvce-editor/rpc-registry'

export const getOffsetAtCursor = async (editorUid: number): Promise<number> => {
  return EditorWorker.getOffsetAtCursor(editorUid)
}
