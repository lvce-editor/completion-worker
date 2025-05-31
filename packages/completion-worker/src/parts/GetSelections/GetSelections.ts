import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const getSelections = async (editorUid: number): Promise<readonly number[]> => {
  const selections = await EditorWorker.invoke('Editor.getSelections2', editorUid)
  return selections
}
