import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as FilterCompletionItems from '../FilterCompletionItems/FilterCompletionItems.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetWordAtOffset from '../GetWordAtOffset/GetWordAtOffset.ts'

export const handleEditorDeleteLeft = async (state: CompletionState): Promise<CompletionState> => {
  const { unfilteredItems, itemHeight, maxHeight, editorUid, maxItems } = state
  const x = 0 // TODO
  // @ts-ignore
  const y = 0 // TODP
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
    items,
    x,
    y,
    maxLineY: newMaxLineY,
    leadingWord: wordAtOffset,
    height,
  }
}
