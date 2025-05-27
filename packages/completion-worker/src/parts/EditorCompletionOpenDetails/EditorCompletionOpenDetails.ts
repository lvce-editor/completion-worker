import type { CompletionDetailState } from '../CompletionDetailState/CompletionDetailState.ts'
import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as GetCompletionDetailBounds from '../GetCompletionDetailBounds/GetCompletionDetailBounds.ts'

export const openDetails = async (state: CompletionState): Promise<CompletionState> => {
  // TODO avoid closure
  // @ts-ignore
  const newStateGenerator = (state: CompletionDetailState): CompletionDetailState => {
    const borderSize = 1
    const newestState: CompletionDetailState = {
      ...state,
      content: 'abc',
      ...GetCompletionDetailBounds.getCompletionDetailBounds(state, borderSize),
    }
    return newestState
  }

  // TODO ask editor worker to add completion details widget
  return state
}
