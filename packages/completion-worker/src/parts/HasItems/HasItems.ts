import * as CompletionStates from '../CompletionStates/CompletionStates.ts'

export const hasItems = (uid: number): boolean => {
  return (CompletionStates.get(uid)?.newState.items.length ?? 0) > 0
}
