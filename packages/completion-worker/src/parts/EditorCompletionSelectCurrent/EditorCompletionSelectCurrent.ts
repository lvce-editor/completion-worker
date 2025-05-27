import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as ViewletEditorCompletionSelectIndex from '../EditorCompletionSelectIndex/EditorCompletionSelectIndex.ts'

export const selectCurrent = (state: CompletionState): Promise<CompletionState> => {
  const { focusedIndex } = state
  return ViewletEditorCompletionSelectIndex.selectIndex(state, focusedIndex)
}
