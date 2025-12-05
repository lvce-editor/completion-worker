import { expect, test } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { getLabel } from '../src/parts/GetLabel/GetLabel.ts'

test('getLabel returns label when present', () => {
  const item: CompletionItem = { flags: 0, kind: 1, label: 'foo', matches: [] }
  expect(getLabel(item)).toBe('foo')
})

test('getLabel returns empty string when label is empty', () => {
  const item: CompletionItem = { flags: 0, kind: 1, label: '', matches: [] }
  expect(getLabel(item)).toBe('')
})

test('getLabel returns empty string when label is missing', () => {
  const item = { flags: 0, kind: 1, matches: [] } as any
  expect(getLabel(item)).toBe('')
})
