import type { CompletionSelectionRange } from '../CompletionSelectionRange/CompletionSelectionRange.ts'

export interface ResolvedCompletionItem {
  readonly selectionRange?: CompletionSelectionRange
  readonly snippet?: string
}
