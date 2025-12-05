import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as Completions from '../Completions/Completions.ts'
import * as FilterCompletionItems from '../FilterCompletionItems/FilterCompletionItems.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPositionAtCursor from '../GetPositionAtCursor/GetPositionAtCursor.ts'
import * as GetWordAtOffset from '../GetWordAtOffset/GetWordAtOffset.ts'

export const loadContent = async (state: CompletionState): Promise<CompletionState> => {
  const { editorLanguageId, editorUid, itemHeight, maxHeight } = state
  const unfilteredItems = await Completions.getCompletions(editorUid, editorLanguageId)
  const wordAtOffset = await GetWordAtOffset.getWordAtOffset(editorUid)
  const items = FilterCompletionItems.filterCompletionItems(unfilteredItems, wordAtOffset)
  const { columnIndex, rowIndex, x, y } = await GetPositionAtCursor.getPositionAtCursor(editorUid)
  const newMaxLineY = Math.min(items.length, 8)
  const itemsLength = items.length
  const newFocusedIndex = itemsLength === 0 ? -1 : 0
  const total = items.length
  const height = GetListHeight.getListHeight(items.length, itemHeight, maxHeight)
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(height, itemHeight, total)
  return {
    ...state,
    columnIndex,
    finalDeltaY,
    focusedIndex: newFocusedIndex,
    height,
    items,
    leadingWord: wordAtOffset,
    maxLineY: newMaxLineY,
    // @ts-ignore
    rowIndex,
    unfilteredItems,
    version: 1,
    width: 200,
    x,
    y,
  }
}
