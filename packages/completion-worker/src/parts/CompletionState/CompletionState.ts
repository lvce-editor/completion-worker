import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import type { VirtualListState } from '../VirtualListState/VirtualListState.ts'

export interface CompletionState extends VirtualListState<CompletionItem> {
  readonly maxHeight: number
  readonly uid: number
  readonly focusedIndex: number
  readonly focused: boolean
  readonly unfilteredItems: readonly CompletionItem[]
  readonly leadingWord: string
  readonly version: number
  readonly editorUid: number
  readonly editorLanguageId: string
  readonly disposed?: boolean
  readonly maxItems: number
}
