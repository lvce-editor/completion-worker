import { test, expect } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import * as CompletionItemFlags from '../src/parts/CompletionItemFlags/CompletionItemFlags.ts'
import * as EmptyMatches from '../src/parts/EmptyMatches/EmptyMatches.ts'
import { filterCompletionItems } from '../src/parts/FilterCompletionItems/FilterCompletionItems.ts'

test('filterCompletionItems returns all items with empty matches when word is empty', () => {
  const items: readonly CompletionItem[] = [
    { flags: CompletionItemFlags.None, kind: 0, label: 'test1', matches: [] },
    { flags: CompletionItemFlags.Deprecated, kind: 0, label: 'test2', matches: [] },
  ]
  const result = filterCompletionItems(items, '')
  expect(result).toEqual([
    { flags: CompletionItemFlags.None, kind: 0, label: 'test1', matches: EmptyMatches.EmptyMatches },
    { flags: CompletionItemFlags.Deprecated, kind: 0, label: 'test2', matches: EmptyMatches.EmptyMatches },
  ])
})

test('filterCompletionItems filters items based on fuzzy search', () => {
  const items: readonly CompletionItem[] = [
    { flags: CompletionItemFlags.None, kind: 0, label: 'test1', matches: [] },
    { flags: CompletionItemFlags.None, kind: 0, label: 'other', matches: [] },
    { flags: CompletionItemFlags.None, kind: 0, label: 'test2', matches: [] },
  ]
  const result = filterCompletionItems(items, 'test')
  expect(result).toHaveLength(2)
  expect(result[0].label).toBe('test1')
  expect(result[1].label).toBe('test2')
})

test('filterCompletionItems puts deprecated items at the end', () => {
  const items = [
    { flags: CompletionItemFlags.Deprecated, kind: 0, label: 'test1', matches: [] },
    { flags: CompletionItemFlags.None, kind: 0, label: 'test2', matches: [] },
    { flags: CompletionItemFlags.Deprecated, kind: 0, label: 'test3', matches: [] },
  ]
  const result = filterCompletionItems(items, 'test')
  expect(result).toEqual([
    { flags: CompletionItemFlags.None, kind: 0, label: 'test2', matches: expect.any(Array) },
    { flags: CompletionItemFlags.Deprecated, kind: 0, label: 'test1', matches: expect.any(Array) },
    { flags: CompletionItemFlags.Deprecated, kind: 0, label: 'test3', matches: expect.any(Array) },
  ])
})

test('filterCompletionItems returns empty array when no matches found', () => {
  const items = [
    { flags: CompletionItemFlags.None, kind: 0, label: 'test1', matches: [] },
    { flags: CompletionItemFlags.None, kind: 0, label: 'test2', matches: [] },
  ]
  const result = filterCompletionItems(items, 'xyz')
  expect(result).toHaveLength(0)
})
