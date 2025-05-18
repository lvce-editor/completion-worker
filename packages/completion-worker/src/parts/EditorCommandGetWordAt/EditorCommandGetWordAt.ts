import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const getWordAt = async (uid: number, rowIndex: number, columnIndex: number): Promise<string> => {
  // @ts-ignore
  const word = await EditorWorker.invoke('Editor.getWordAt2', uid, rowIndex, columnIndex)
  // @ts-ignore
  return word
}
