import type { CompletionState } from '../CompletionState/CompletionState.ts'

export const createDefaultState = (): CompletionState => {
  return {
    uid: 0,
    items: [],
    itemHeight: 20,
    maxHeight: 150,
    minLineY: 0,
    maxLineY: 0,
    focusedIndex: -1,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    deltaY: 0,
    finalDeltaY: 0,
    focused: false,
    headerHeight: 0,
    leadingWord: '',
    unfilteredItems: [],
    version: 0,
  }
}
