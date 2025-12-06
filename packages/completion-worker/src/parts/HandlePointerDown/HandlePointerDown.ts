import type { CompletionState } from '../CompletionState/CompletionState.ts'
import { selectIndex } from '../EditorCompletionSelectIndex/EditorCompletionSelectIndex.ts'
import { getIndexFromPosition } from '../GetIndexFromPosition/GetIndexFromPosition.ts'

export const handlePointerDown = async (state: CompletionState, clientX: number, clientY: number): Promise<CompletionState> => {
  const { itemHeight, items, y } = state
  const index = getIndexFromPosition(y, clientY, itemHeight)
  if (index < 0 || index >= items.length) {
    //  TODO close maybe?
    return state
  }
  return selectIndex(state, index)
}
