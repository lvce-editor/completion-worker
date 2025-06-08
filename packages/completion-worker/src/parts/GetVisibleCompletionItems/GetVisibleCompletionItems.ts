import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import type { VisibleCompletionItem } from '../VisibleCompletionItem/VisibleCompletionItem.ts'
import * as GetVisibleCompletionItem from '../GetVisibleCompletionItem/GetVisibleCompletionItem.ts'

export const getVisibleItems = (
  filteredItems: readonly CompletionItem[],
  itemHeight: number,
  leadingWord: string,
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  deltaY: number,
): readonly VisibleCompletionItem[] => {
  const visibleItems: VisibleCompletionItem[] = []
  const relative = deltaY % itemHeight
  for (let i = minLineY; i < maxLineY; i++) {
    const filteredItem = filteredItems[i]
    visibleItems.push(GetVisibleCompletionItem.getVisibleIem(filteredItem, itemHeight, leadingWord, i, minLineY, focusedIndex, relative))
  }
  return visibleItems
}
