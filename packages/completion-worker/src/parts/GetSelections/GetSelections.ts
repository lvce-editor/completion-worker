import { EditorWorker } from '@lvce-editor/rpc-registry'

export const getSelections = (editorUid: number): ReturnType<typeof EditorWorker.getSelections> => EditorWorker.getSelections(editorUid)
