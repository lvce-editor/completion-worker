import { expect, test } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { getLabel } from '../src/parts/GetLabel/GetLabel.ts'

test('getLabel returns label when present', () => {
  const item: CompletionItem = { label: 'foo', kind: 1, flags: 0, matches: [] }
  expect(getLabel(item)).toBe('foo')
})

test('getLabel returns empty string when label is empty', () => {
  const item: CompletionItem = { label: '', kind: 1, flags: 0, matches: [] }
  expect(getLabel(item)).toBe('')
})

test('getLabel returns empty string when label is missing', () => {
  const item = { kind: 1, flags: 0, matches: [] } as any
  expect(getLabel(item)).toBe('')
})
