import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as FilterCompletionItems from '../FilterCompletionItems/FilterCompletionItems.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPositionAtCursor from '../GetPositionAtCursor/GetPositionAtCursor.ts'
import * as GetWordAtOffset from '../GetWordAtOffset/GetWordAtOffset.ts'

export const handleEditorDeleteLeft = async (state: CompletionState): Promise<CompletionState> => {
  const { editorUid, itemHeight, maxHeight, maxItems, unfilteredItems } = state
  const { x, y } = await GetPositionAtCursor.getPositionAtCursor(editorUid)
  const wordAtOffset = await GetWordAtOffset.getWordAtOffset(editorUid)
  if (!wordAtOffset) {
    return {
      ...state,
      disposed: true,
    }
  }
  const items = FilterCompletionItems.filterCompletionItems(unfilteredItems, wordAtOffset)
  const newMaxLineY = Math.min(items.length, maxItems)
  const height = GetListHeight.getListHeight(items.length, itemHeight, maxHeight)
  return {
    ...state,
    height,
    items,
    leadingWord: wordAtOffset,
    maxLineY: newMaxLineY,
    x,
    y,
  }
}
