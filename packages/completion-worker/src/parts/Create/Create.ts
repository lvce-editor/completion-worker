import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as FindWidgetStates from '../CompletionStates/CompletionStates.ts'

export const create = (uid: number, x: number, y: number, width: number, height: number, editorUid: number, editorLanguageId: string): void => {
  const state: CompletionState = {
    deltaY: 0,
    editorLanguageId,
    editorUid,
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
    uid,
    unfilteredItems: [],
    version: 0,
    width: 0,
    x: 0,
    y: 0,
  }
  FindWidgetStates.set(uid, state, state)
}
