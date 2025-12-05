import type { CompletionState } from '../CompletionState/CompletionState.ts'

export const createDefaultState = (): CompletionState => {
  return {
    deltaY: 0,
    editorLanguageId: '',
    editorUid: 0,
    finalDeltaY: 0,
    focused: false,
    focusedIndex: -1,
    headerHeight: 0,
    height: 0,
    itemHeight: 20,
    items: [],
    leadingWord: '',
    maxHeight: 150,
    maxItems: 8,
    maxLineY: 0,
    minLineY: 0,
    uid: 0,
    unfilteredItems: [],
    version: 0,
    width: 0,
    x: 0,
    y: 0,
  }
}
