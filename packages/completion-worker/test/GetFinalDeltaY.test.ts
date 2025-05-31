import { test, expect } from '@jest/globals'
import { getFinalDeltaY } from '../src/parts/GetFinalDeltaY/GetFinalDeltaY.ts'

test('getFinalDeltaY returns 0 when content fits in height', () => {
  const result = getFinalDeltaY(100, 20, 4)
  expect(result).toBe(0)
})

test('getFinalDeltaY returns positive delta when content exceeds height', () => {
  const result = getFinalDeltaY(50, 20, 4)
  expect(result).toBe(30)
})

test('getFinalDeltaY handles empty items', () => {
  const result = getFinalDeltaY(100, 20, 0)
  expect(result).toBe(0)
})

test('getFinalDeltaY handles single item', () => {
  const result = getFinalDeltaY(100, 20, 1)
  expect(result).toBe(0)
})

test('getFinalDeltaY handles exact fit', () => {
  const result = getFinalDeltaY(100, 20, 5)
  expect(result).toBe(0)
})
