import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as Select from '../Select/Select.ts'

export const selectIndex = async (state: CompletionState, index: number): Promise<CompletionState> => {
  const { items } = state
  if (index === -1) {
    return state
  }
  if (index > items.length) {
    throw new Error('index too large')
  }
  const actualIndex = index
  const completionItem = items[actualIndex]
  return Select.select(state, completionItem)
}
