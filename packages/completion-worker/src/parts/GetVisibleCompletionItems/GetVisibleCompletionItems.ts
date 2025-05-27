import * as GetVisibleCompletionItem from '../GetVisibleCompletionItem/GetVisibleCompletionItem.ts'

export const getVisibleItems = (
  filteredItems: readonly any[],
  itemHeight: number,
  leadingWord: any,
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
): readonly any[] => {
  const visibleItems = []
  for (let i = minLineY; i < maxLineY; i++) {
    const filteredItem = filteredItems[i]
    visibleItems.push(GetVisibleCompletionItem.getVisibleIem(filteredItem, itemHeight, leadingWord, i, focusedIndex))
  }
  return visibleItems
}
