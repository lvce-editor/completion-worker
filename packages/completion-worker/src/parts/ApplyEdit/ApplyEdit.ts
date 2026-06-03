import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { Change } from '../Change/Change.ts'

export const applyEdit = async (editorUid: number, changes: readonly Change[]): Promise<void> => {
  await EditorWorker.applyEdit(editorUid, changes)
}
