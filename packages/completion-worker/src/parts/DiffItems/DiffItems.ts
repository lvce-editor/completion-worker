import type { CompletionState } from '../CompletionState/CompletionState.ts'

export const isEqual = (oldState: CompletionState, newState: CompletionState): boolean => {
  return oldState.items === newState.items && oldState.focusedIndex === newState.focusedIndex
}
