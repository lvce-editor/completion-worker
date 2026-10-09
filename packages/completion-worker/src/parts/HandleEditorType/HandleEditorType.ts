import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as FilterCompletionItems from '../FilterCompletionItems/FilterCompletionItems.ts'
import * as GetCompletionContext from '../GetCompletionContext/GetCompletionContext.ts'
import * as GetCompletionHorizontalBounds from '../GetCompletionHorizontalBounds/GetCompletionHorizontalBounds.ts'
import * as GetCompletionWord from '../GetCompletionWord/GetCompletionWord.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'

export const handleEditorType = async (state: CompletionState): Promise<CompletionState> => {
  const { editorLanguageId, editorUid, itemHeight, maxHeight, unfilteredItems } = state
  const context = await GetCompletionContext.getCompletionContext(editorUid, editorLanguageId === 'json' || editorLanguageId === 'jsonc')
  const { columnIndex, editorWidth, editorX, line, rowIndex, wordBefore, x: cursorX, y } = context
  const wordAtOffset = await GetCompletionWord.getCompletionWord(
    editorUid,
    editorLanguageId,
    rowIndex,
    columnIndex,
    () => Promise.resolve(wordBefore || ''),
    line,
  )
  const items = FilterCompletionItems.filterCompletionItems(unfilteredItems, wordAtOffset)
  const newMinLineY = 0
  const newMaxLineY = Math.min(items.length, 8)
  const height = GetListHeight.getListHeight(items.length, itemHeight, maxHeight)
  const { width, x } = GetCompletionHorizontalBounds.getCompletionHorizontalBounds(items, cursorX, editorX, editorWidth)
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
