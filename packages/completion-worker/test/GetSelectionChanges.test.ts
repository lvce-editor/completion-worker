import { expect, test } from '@jest/globals'
import { getSelectionChanges } from '../src/parts/GetSelectionChanges/GetSelectionChanges.ts'

test('returns undefined without a selection range', () => {
  expect(getSelectionChanges('value', 0, 0, undefined)).toBeUndefined()
})

test('maps a single-line selection relative to the inserted text', () => {
  expect(getSelectionChanges('before value after', 2, 4, { endOffset: 12, startOffset: 7 })).toEqual(new Uint32Array([2, 11, 2, 16]))
})

test('maps a collapsed selection', () => {
  expect(getSelectionChanges('value', 2, 4, { endOffset: 3, startOffset: 3 })).toEqual(new Uint32Array([2, 7, 2, 7]))
})

test('maps a selection on a later inserted line', () => {
  expect(getSelectionChanges('first\nsecond\nthird', 2, 4, { endOffset: 12, startOffset: 6 })).toEqual(new Uint32Array([3, 0, 3, 6]))
})

test('maps a selection across inserted lines', () => {
  expect(getSelectionChanges('first\nsecond\nthird', 2, 4, { endOffset: 14, startOffset: 3 })).toEqual(new Uint32Array([2, 7, 4, 1]))
})

test('maps a selection in a snippet with CRLF line endings', () => {
  expect(getSelectionChanges('first\r\nsecond', 2, 4, { endOffset: 13, startOffset: 7 })).toEqual(new Uint32Array([3, 0, 3, 6]))
})

test.each([
  ['non-object', 'selection'],
  ['missing start offset', { endOffset: 2 }],
  ['missing end offset', { startOffset: 0 }],
  ['negative start offset', { endOffset: 2, startOffset: -1 }],
  ['reversed offsets', { endOffset: 1, startOffset: 2 }],
  ['end beyond inserted text', { endOffset: 6, startOffset: 0 }],
  ['non-integer start offset', { endOffset: 2, startOffset: 0.5 }],
  ['non-integer end offset', { endOffset: 2.5, startOffset: 0 }],
])('returns undefined for %s', (_name, selectionRange: unknown) => {
  expect(getSelectionChanges('value', 0, 0, selectionRange)).toBeUndefined()
})
