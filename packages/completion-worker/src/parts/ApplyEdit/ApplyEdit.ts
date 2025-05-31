import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const applyEdit = async (editorUid: number, changes: readonly any[]): Promise<void> => {
  // @ts-ignore
  await EditorWorker.invoke('Editor.applyEdit2', editorUid, changes)
}
