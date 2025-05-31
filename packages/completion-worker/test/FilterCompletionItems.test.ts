import { test, expect } from '@jest/globals'
import * as CompletionItemFlags from '../src/parts/CompletionItemFlags/CompletionItemFlags.ts'
import * as EmptyMatches from '../src/parts/EmptyMatches/EmptyMatches.ts'
import { filterCompletionItems } from '../src/parts/FilterCompletionItems/FilterCompletionItems.ts'

test('filterCompletionItems returns all items with empty matches when word is empty', () => {
  const items = [
    { label: 'test1', flags: CompletionItemFlags.None },
    { label: 'test2', flags: CompletionItemFlags.Deprecated },
  ]
  const result = filterCompletionItems(items, '')
  expect(result).toHaveLength(2)
  expect(result[0].matches).toBe(EmptyMatches.EmptyMatches)
  expect(result[1].matches).toBe(EmptyMatches.EmptyMatches)
})

test('filterCompletionItems filters items based on fuzzy search', () => {
  const items = [
    { label: 'test1', flags: CompletionItemFlags.None },
    { label: 'other', flags: CompletionItemFlags.None },
    { label: 'test2', flags: CompletionItemFlags.None },
  ]
  const result = filterCompletionItems(items, 'test')
  expect(result).toHaveLength(2)
  expect(result[0].label).toBe('test1')
  expect(result[1].label).toBe('test2')
})

test('filterCompletionItems puts deprecated items at the end', () => {
  const items = [
    { label: 'test1', flags: CompletionItemFlags.Deprecated },
    { label: 'test2', flags: CompletionItemFlags.None },
    { label: 'test3', flags: CompletionItemFlags.Deprecated },
  ]
  const result = filterCompletionItems(items, 'test')
  expect(result).toHaveLength(3)
  expect(result[0].label).toBe('test2')
  expect(result[1].label).toBe('test1')
  expect(result[2].label).toBe('test3')
})

test('filterCompletionItems returns empty array when no matches found', () => {
  const items = [
    { label: 'test1', flags: CompletionItemFlags.None },
    { label: 'test2', flags: CompletionItemFlags.None },
  ]
  const result = filterCompletionItems(items, 'xyz')
  expect(result).toHaveLength(0)
})
