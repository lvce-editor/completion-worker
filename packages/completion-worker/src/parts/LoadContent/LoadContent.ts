import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as Completions from '../Completions/Completions.ts'
import * as FilterCompletionItems from '../FilterCompletionItems/FilterCompletionItems.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPositionAtCursor from '../GetPositionAtCursor/GetPositionAtCursor.ts'
import * as GetWordAtOffset from '../GetWordAtOffset/GetWordAtOffset.ts'

export const loadContent = async (state: CompletionState): Promise<CompletionState> => {
  const editor = {} as any // TODO
  const { itemHeight, maxHeight } = state
  const unfilteredItems = await Completions.getCompletions(editor)
  const wordAtOffset = GetWordAtOffset.getWordAtOffset(editor)
  const items = FilterCompletionItems.filterCompletionItems(unfilteredItems, wordAtOffset)
  const { rowIndex, columnIndex, x, y } = await GetPositionAtCursor.getPositionAtCursor(editor)
  const newMaxLineY = Math.min(items.length, 8)
  editor.widgets = editor.widgets || []
  // editor.widgets.push(ViewletModuleId.EditorCompletion)
  const itemsLength = items.length
  const newFocusedIndex = itemsLength === 0 ? -1 : 0
  const total = items.length
  const height = GetListHeight.getListHeight(items.length, itemHeight, maxHeight)
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(height, itemHeight, total)
  return {
    ...state,
    unfilteredItems,
    items,
    x,
    y,
    maxLineY: newMaxLineY,
    focusedIndex: newFocusedIndex,
    finalDeltaY,
    leadingWord: wordAtOffset,
    height,
    // @ts-ignore
    rowIndex,
    columnIndex,
    // editorUid,
    width: 200,
  }
}
