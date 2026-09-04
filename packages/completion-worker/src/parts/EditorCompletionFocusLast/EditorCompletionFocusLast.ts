import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as EditorCompletionFocusIndex from '../EditorCompletionFocusIndex/EditorCompletionFocusIndex.ts'

export const focusLast = (state: CompletionState): CompletionState => {
  const { items } = state
  const lastIndex = items.length - 1
  return EditorCompletionFocusIndex.focusIndex(state, lastIndex)
}
