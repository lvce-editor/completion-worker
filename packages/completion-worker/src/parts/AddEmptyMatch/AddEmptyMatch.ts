import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import * as EmptyMatches from '../EmptyMatches/EmptyMatches.ts'

export const addEmptyMatch = (item: CompletionItem): CompletionItem => {
  return {
    ...item,
    matches: EmptyMatches.EmptyMatches,
  }
}
