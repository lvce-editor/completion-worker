import { EditorWorker } from '@lvce-editor/rpc-registry'

export const getLines = (editorUid: number): ReturnType<typeof EditorWorker.getLines> => EditorWorker.getLines(editorUid)
