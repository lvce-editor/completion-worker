import { expect, test } from '@jest/globals'
import { getCompletionWidth } from '../src/parts/GetCompletionWidth/GetCompletionWidth.ts'

test('getCompletionWidth keeps short and empty suggestion lists at the default width', () => {
  expect(getCompletionWidth([])).toBe(200)
  expect(getCompletionWidth([{ flags: 0, kind: 1, label: 'short', matches: [] }])).toBe(200)
  expect(getCompletionWidth([{ flags: 0, kind: 1, label: ' '.repeat(80), matches: [] }])).toBeGreaterThan(200)
})

test('getCompletionWidth grows to fit the widest label', () => {
  const items = [
    { flags: 0, kind: 1, label: 'short', matches: [] },
    { flags: 0, kind: 1, label: 'window.titleBarStyle', matches: [] },
  ]
  expect(getCompletionWidth(items)).toBeGreaterThan(200)
  expect(getCompletionWidth(items)).toBe(getCompletionWidth([items[1]]))
})

test('getCompletionWidth measures Unicode code points and caps extremely long labels', () => {
  const emojiLabel = [{ flags: 0, kind: 1, label: '😀'.repeat(20), matches: [] }]
  const longLabel = [{ flags: 0, kind: 1, label: 'x'.repeat(1000), matches: [] }]
  expect(getCompletionWidth(emojiLabel)).toBe(348)
  expect(getCompletionWidth(longLabel)).toBe(600)
})
