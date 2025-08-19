import type { Change } from '../Change/Change.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const applyEdit = async (editorUid: number, changes: readonly Change[]): Promise<void> => {
  await EditorWorker.applyEdit(editorUid, changes)
}
