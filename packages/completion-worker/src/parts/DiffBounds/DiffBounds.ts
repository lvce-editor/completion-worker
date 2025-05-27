import type { CompletionState } from '../CompletionState/CompletionState.ts'

export const isEqual = (oldState: CompletionState, newState: CompletionState): boolean => {
  return oldState.x === newState.x && oldState.y === newState.y && oldState.width === newState.width && oldState.height === newState.height
}
