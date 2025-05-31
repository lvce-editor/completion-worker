import { test, expect } from '@jest/globals'
import { clamp } from '../src/parts/Clamp/Clamp.ts'

test('clamp', () => {
  expect(clamp(5, 0, 10)).toBe(5)
  expect(clamp(-5, 0, 10)).toBe(0)
  expect(clamp(15, 0, 10)).toBe(10)
})
