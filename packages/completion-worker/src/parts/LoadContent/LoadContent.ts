import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as Completions from '../Completions/Completions.ts'
import * as FilterCompletionItems from '../FilterCompletionItems/FilterCompletionItems.ts'
import * as GetCompletionHorizontalBounds from '../GetCompletionHorizontalBounds/GetCompletionHorizontalBounds.ts'
import * as GetCompletionWord from '../GetCompletionWord/GetCompletionWord.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPositionAtCursor from '../GetPositionAtCursor/GetPositionAtCursor.ts'

export const loadContent = async (state: CompletionState, automatic?: boolean): Promise<CompletionState> => {
  const { applicationId, automatic: previousAutomatic = false, editorLanguageId, editorUid, itemHeight, maxHeight, version } = state
  const [unfilteredItems, position] = await Promise.all([
    Completions.getCompletions(editorUid, editorLanguageId, applicationId),
    GetPositionAtCursor.getPositionAtCursor(editorUid),
  ])
  const { columnIndex, editorWidth, editorX, rowIndex, x: cursorX, y } = position
  const wordAtOffset = await GetCompletionWord.getCompletionWord(editorUid, editorLanguageId, rowIndex, columnIndex)
  const items = FilterCompletionItems.filterCompletionItems(unfilteredItems, wordAtOffset)
  const newMaxLineY = Math.min(items.length, 8)
  const itemsLength = items.length
  const newFocusedIndex = itemsLength === 0 ? -1 : 0
  const total = items.length
  const height = GetListHeight.getListHeight(items.length, itemHeight, maxHeight)
  const { width, x } = GetCompletionHorizontalBounds.getCompletionHorizontalBounds(items, cursorX, editorX, editorWidth)
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(height, itemHeight, total)
  return {
    ...state,
    automatic: automatic ?? previousAutomatic,
    // @ts-ignore
    columnIndex,
    finalDeltaY,
    focusedIndex: newFocusedIndex,
    height,
    items,
    leadingWord: wordAtOffset,
    maxLineY: newMaxLineY,
    rowIndex,
    unfilteredItems,
    version: version + 1,
    width,
    x,
    y,
  }
}
