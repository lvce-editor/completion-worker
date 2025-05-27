import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as GetCompletionVirtualDom from '../GetCompletionVirtualDom/GetCompletionVirtualDom.ts'
import * as GetVisibleCompletionItems from '../GetVisibleCompletionItems/GetVisibleCompletionItems.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderItems = (oldState: CompletionState, newState: CompletionState): readonly any[] => {
  const { uid } = newState
  const visibleItems = GetVisibleCompletionItems.getVisibleItems(
    newState.items,
    newState.itemHeight,
    newState.leadingWord,
    newState.minLineY,
    newState.maxLineY,
    newState.focusedIndex,
  )
  const dom = GetCompletionVirtualDom.getCompletionVirtualDom(visibleItems)
  return [RenderMethod.SetDom2, uid, dom]
}
