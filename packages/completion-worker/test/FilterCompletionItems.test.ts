import { test, expect } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import * as CompletionItemFlags from '../src/parts/CompletionItemFlags/CompletionItemFlags.ts'
import * as EmptyMatches from '../src/parts/EmptyMatches/EmptyMatches.ts'
import { filterCompletionItems } from '../src/parts/FilterCompletionItems/FilterCompletionItems.ts'

test('filterCompletionItems returns all items with empty matches when word is empty', () => {
  const items: readonly CompletionItem[] = [
    { label: 'test1', flags: CompletionItemFlags.None, kind: 0, matches: [] },
    { label: 'test2', flags: CompletionItemFlags.Deprecated, kind: 0, matches: [] },
  ]
  const result = filterCompletionItems(items, '')
  expect(result).toEqual([
    { label: 'test1', flags: CompletionItemFlags.None, kind: 0, matches: EmptyMatches.EmptyMatches },
    { label: 'test2', flags: CompletionItemFlags.Deprecated, kind: 0, matches: EmptyMatches.EmptyMatches },
  ])
})

test('filterCompletionItems filters items based on fuzzy search', () => {
  const items: readonly CompletionItem[] = [
    { label: 'test1', flags: CompletionItemFlags.None, kind: 0, matches: [] },
    { label: 'other', flags: CompletionItemFlags.None, kind: 0, matches: [] },
    { label: 'test2', flags: CompletionItemFlags.None, kind: 0, matches: [] },
  ]
  const result = filterCompletionItems(items, 'test')
  expect(result).toHaveLength(2)
  expect(result[0].label).toBe('test1')
  expect(result[1].label).toBe('test2')
})

test('filterCompletionItems puts deprecated items at the end', () => {
  const items = [
    { label: 'test1', flags: CompletionItemFlags.Deprecated, kind: 0, matches: [] },
    { label: 'test2', flags: CompletionItemFlags.None, kind: 0, matches: [] },
    { label: 'test3', flags: CompletionItemFlags.Deprecated, kind: 0, matches: [] },
  ]
  const result = filterCompletionItems(items, 'test')
  expect(result).toEqual([
    { label: 'test2', flags: CompletionItemFlags.None, kind: 0, matches: expect.any(Array) },
    { label: 'test1', flags: CompletionItemFlags.Deprecated, kind: 0, matches: expect.any(Array) },
    { label: 'test3', flags: CompletionItemFlags.Deprecated, kind: 0, matches: expect.any(Array) },
  ])
})

test('filterCompletionItems returns empty array when no matches found', () => {
  const items = [
    { label: 'test1', flags: CompletionItemFlags.None, kind: 0, matches: [] },
    { label: 'test2', flags: CompletionItemFlags.None, kind: 0, matches: [] },
  ]
  const result = filterCompletionItems(items, 'xyz')
  expect(result).toHaveLength(0)
})
