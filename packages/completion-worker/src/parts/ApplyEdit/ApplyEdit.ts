import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { Change } from '../Change/Change.ts'

export const applyEdit = async (editorUid: number, changes: readonly Change[], selectionChanges?: Uint32Array): Promise<void> => {
  if (selectionChanges) {
    await EditorWorker.invoke('Editor.applyEdit2', editorUid, changes, selectionChanges)
  } else {
    await EditorWorker.invoke('Editor.applyEdit2', editorUid, changes)
  }
}
