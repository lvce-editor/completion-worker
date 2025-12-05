import type { CompletionState } from '../CompletionState/CompletionState.ts'

export const focusIndex = (state: CompletionState, index: number): CompletionState => {
  const newState: CompletionState = {
    ...state,
    focused: true,
    focusedIndex: index,
  }
  return newState
}
