import { test, expect } from '@jest/globals'
import { getScrollBarTop } from '../src/parts/GetScrollBarTop/GetScrollBarTop.ts'

test('getScrollBarTop should calculate correct position at start', () => {
  const result = getScrollBarTop(100, 1000, 0)
  expect(result).toBe(0)
})

test('getScrollBarTop should calculate correct position at middle', () => {
  const result = getScrollBarTop(100, 1000, 500)
  expect(result).toBe(50)
})

test('getScrollBarTop should calculate correct position at end', () => {
  const result = getScrollBarTop(100, 1000, 1000)
  expect(result).toBe(100)
})

test('getScrollBarTop should round to nearest integer', () => {
  const result = getScrollBarTop(100, 1000, 333)
  expect(result).toBe(33)
})
