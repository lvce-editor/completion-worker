import { EditorWorker } from '@lvce-editor/rpc-registry'

export const getWordBefore = (editorUid: number, rowIndex: number, columnIndex: number): ReturnType<typeof EditorWorker.getWordBefore> =>
  EditorWorker.getWordBefore(editorUid, rowIndex, columnIndex)
