import * as CompletionStates from '../CompletionStates/CompletionStates.ts'
import * as Diff from '../Diff/Diff.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { oldState, newState } = CompletionStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  return diffResult
}
