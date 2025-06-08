import { test, expect } from '@jest/globals'
import { getScrollBarSize } from '../src/parts/GetScrollBarSize/GetScrollBarSize.ts'

test('should return 0 when container size is greater than or equal to content size', () => {
  expect(getScrollBarSize(100, 80, 20)).toBe(0)
  expect(getScrollBarSize(100, 100, 20)).toBe(0)
})

test('should return minimum slider size when calculated size is smaller', () => {
  expect(getScrollBarSize(100, 1000, 20)).toBe(20)
})

test('should calculate correct scrollbar size', () => {
  expect(getScrollBarSize(100, 200, 10)).toBe(50)
  expect(getScrollBarSize(200, 400, 10)).toBe(100)
})

test('should round the calculated size', () => {
  expect(getScrollBarSize(100, 300, 10)).toBe(33)
})
