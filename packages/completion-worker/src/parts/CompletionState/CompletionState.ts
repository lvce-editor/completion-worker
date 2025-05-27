import type { VirtualListState } from '../VirtualListState/VirtualListState.ts'

export interface CompletionState extends VirtualListState<any> {
  readonly maxHeight: number
  readonly uid: number
  readonly focusedIndex: number
  readonly focused: boolean
  readonly unfilteredItems: readonly any[]
  readonly leadingWord: string
  readonly version: number
  readonly editorUid: number
  readonly editorLanguageId: string
  readonly disposed?: boolean
}
