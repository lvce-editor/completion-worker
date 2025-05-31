import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as ApplyEdit from '../ApplyEdit/ApplyEdit.ts'
import * as Close from '../Close/Close.ts'
import { getEdits } from '../GetEdits/GetEdits.ts'

export const select = async (state: CompletionState, completionItem: any): Promise<CompletionState> => {
  const { editorUid, leadingWord } = state
  const changes = await getEdits(editorUid, leadingWord, completionItem)
  await ApplyEdit.applyEdit(editorUid, changes)
  await Close.close(editorUid)
  return {
    ...state,
  }
}
