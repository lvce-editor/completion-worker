import * as FuzzySearch from '@lvce-editor/fuzzy-search'
import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import { addEmptyMatch } from '../AddEmptyMatch/AddEmptyMatch.ts'
import * as Character from '../Character/Character.ts'
import * as CompletionItemFlags from '../CompletionItemFlags/CompletionItemFlags.ts'
import * as EmptyMatches from '../EmptyMatches/EmptyMatches.ts'

export const filterCompletionItems = (completionItems: readonly CompletionItem[], word: string): readonly CompletionItem[] => {
  if (word === Character.EmptyString) {
    return completionItems.map(addEmptyMatch)
  }
  const filteredCompletions: CompletionItem[] = []
  const deprecated: CompletionItem[] = []
  for (const completionItem of completionItems) {
    const { label, flags } = completionItem
    const result = FuzzySearch.fuzzySearch(word, label)
    if (result.length > 0) {
      if (flags & CompletionItemFlags.Deprecated) {
        // TODO avoid mutation
        // @ts-ignore
        completionItem.matches = EmptyMatches.EmptyMatches
        deprecated.push(completionItem)
      } else {
        // TODO avoid mutation
        // @ts-ignore
        completionItem.matches = result
        filteredCompletions.push(completionItem)
      }
    }
  }
  if (deprecated.length > 0) {
    filteredCompletions.push(...deprecated)
  }
  return filteredCompletions
}
