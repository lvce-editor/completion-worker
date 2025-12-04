import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import type { VirtualListState } from '../VirtualListState/VirtualListState.ts'

export interface CompletionState extends VirtualListState<CompletionItem> {
  readonly disposed?: boolean
  readonly editorLanguageId: string
  readonly editorUid: number
  readonly focused: boolean
  readonly focusedIndex: number
  readonly leadingWord: string
  readonly maxHeight: number
  readonly maxItems: number
  readonly uid: number
  readonly unfilteredItems: readonly CompletionItem[]
  readonly version: number
}
