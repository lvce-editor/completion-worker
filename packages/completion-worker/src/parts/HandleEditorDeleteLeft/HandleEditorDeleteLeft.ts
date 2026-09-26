import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as FilterCompletionItems from '../FilterCompletionItems/FilterCompletionItems.ts'
import * as GetCompletionWidth from '../GetCompletionWidth/GetCompletionWidth.ts'
import * as GetCompletionWord from '../GetCompletionWord/GetCompletionWord.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPositionAtCursor from '../GetPositionAtCursor/GetPositionAtCursor.ts'

export const handleEditorDeleteLeft = async (state: CompletionState): Promise<CompletionState> => {
  const { editorLanguageId, editorUid, itemHeight, maxHeight, maxItems, unfilteredItems } = state
  const { columnIndex, rowIndex, x, y } = await GetPositionAtCursor.getPositionAtCursor(editorUid)
  const wordAtOffset = await GetCompletionWord.getCompletionWord(editorUid, editorLanguageId, rowIndex, columnIndex)
  if (!wordAtOffset) {
    return {
      ...state,
      disposed: true,
    }
  }
  const items = FilterCompletionItems.filterCompletionItems(unfilteredItems, wordAtOffset)
  const newMaxLineY = Math.min(items.length, maxItems)
  const height = GetListHeight.getListHeight(items.length, itemHeight, maxHeight)
  const width = GetCompletionWidth.getCompletionWidth(items)
  return {
    ...state,
    height,
    items,
    leadingWord: wordAtOffset,
    maxLineY: newMaxLineY,
    width,
    x,
    y,
  }
}
