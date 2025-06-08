import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'

export const getLabel = (item: CompletionItem): string => {
  return item.label || ''
}
