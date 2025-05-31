import { test, expect } from '@jest/globals'
import { getListHeight } from '../src/parts/GetListHeight/GetListHeight.ts'

test('getListHeight returns itemHeight when itemsLength is 0', () => {
  const result = getListHeight(0, 20, 100)
  expect(result).toBe(20)
})

test('getListHeight returns total height when less than maxHeight', () => {
  const result = getListHeight(3, 20, 100)
  expect(result).toBe(60)
})

test('getListHeight returns maxHeight when total height exceeds maxHeight', () => {
  const result = getListHeight(10, 20, 100)
  expect(result).toBe(100)
})

test('getListHeight throws error for invalid inputs', () => {
  expect(() => getListHeight('invalid' as any, 20, 100)).toThrow()
  expect(() => getListHeight(5, 'invalid' as any, 100)).toThrow()
  expect(() => getListHeight(5, 20, 'invalid' as any)).toThrow()
})
