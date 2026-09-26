import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as FilterCompletionItems from '../FilterCompletionItems/FilterCompletionItems.ts'
import * as GetCompletionWord from '../GetCompletionWord/GetCompletionWord.ts'
import * as GetCompletionWidth from '../GetCompletionWidth/GetCompletionWidth.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPositionAtCursor from '../GetPositionAtCursor/GetPositionAtCursor.ts'
import * as GetWordBefore from '../GetWordBefore/GetWordBefore.ts'

export const handleEditorType = async (state: CompletionState): Promise<CompletionState> => {
  const { editorLanguageId, editorUid, itemHeight, maxHeight, unfilteredItems } = state
  const { columnIndex, rowIndex, x, y } = await GetPositionAtCursor.getPositionAtCursor(editorUid)
  const wordAtOffset = await GetCompletionWord.getCompletionWord(
    editorUid,
    editorLanguageId,
    rowIndex,
    columnIndex,
    () => GetWordBefore.getWordBefore(editorUid, rowIndex, columnIndex),
  )
  const items = FilterCompletionItems.filterCompletionItems(unfilteredItems, wordAtOffset)
  const newMinLineY = 0
  const newMaxLineY = Math.min(items.length, 8)
  const height = GetListHeight.getListHeight(items.length, itemHeight, maxHeight)
  const width = GetCompletionWidth.getCompletionWidth(items)
  const finalDeltaY = items.length * itemHeight - height
  return {
    ...state,
    finalDeltaY,
    height,
    items,
    leadingWord: wordAtOffset,
    maxLineY: newMaxLineY,
    minLineY: newMinLineY,
    width,
    x,
    y,
  }
}
