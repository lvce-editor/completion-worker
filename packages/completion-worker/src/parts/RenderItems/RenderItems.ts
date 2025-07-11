import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as GetCompletionVirtualDom from '../GetCompletionVirtualDom/GetCompletionVirtualDom.ts'
import * as GetScrollBarSize from '../GetScrollBarSize/GetScrollBarSize.ts'
import { getScrollBarTop } from '../GetScrollBarTop/GetScrollBarTop.ts'
import * as GetVisibleCompletionItems from '../GetVisibleCompletionItems/GetVisibleCompletionItems.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderItems = (oldState: CompletionState, newState: CompletionState): readonly any[] => {
  const { uid, height, deltaY, items, itemHeight, leadingWord, minLineY, maxLineY, focusedIndex } = newState
  const visibleItems = GetVisibleCompletionItems.getVisibleItems(items, itemHeight, leadingWord, minLineY, maxLineY, focusedIndex, deltaY)
  const contentHeight = newState.items.length * newState.itemHeight
  const scrollBarHeight = GetScrollBarSize.getScrollBarSize(height, contentHeight, 20)
  const scrollBarTop = getScrollBarTop(height, contentHeight, deltaY)
  const dom = GetCompletionVirtualDom.getCompletionVirtualDom(visibleItems, scrollBarHeight, scrollBarTop)
  return [RenderMethod.SetDom2, uid, dom]
}
