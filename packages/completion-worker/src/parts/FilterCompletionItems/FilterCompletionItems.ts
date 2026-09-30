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
  const prefixMatches: CompletionItem[] = []
  const fuzzyMatches: CompletionItem[] = []
  const deprecated: CompletionItem[] = []
  for (const completionItem of completionItems) {
    const { flags, label } = completionItem
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
        if (label.toLowerCase().startsWith(word.toLowerCase())) {
          prefixMatches.push(completionItem)
        } else {
          fuzzyMatches.push(completionItem)
        }
      }
    }
  }
  const filteredCompletions = [...prefixMatches, ...fuzzyMatches]
  if (deprecated.length > 0) {
    filteredCompletions.push(...deprecated)
  }
  return filteredCompletions
}
