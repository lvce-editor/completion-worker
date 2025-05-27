import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const getWordAtOffset = async (editorUid: number): Promise<string> => {
  return EditorWorker.invoke('Editor.getWordAtOffset2', editorUid)
}
