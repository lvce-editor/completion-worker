import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const getLines = async (editorUid: number): Promise<readonly string[]> => {
  const lines = await EditorWorker.invoke('Editor.getLines2', editorUid)
  return lines
}
