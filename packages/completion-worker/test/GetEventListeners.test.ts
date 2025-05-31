import { test, expect } from '@jest/globals'
import { getEventListeners } from '../src/parts/GetEventListeners/GetEventListeners.ts'

test('getEventListeners', () => {
  const result = getEventListeners(123)
  expect(result).toEqual([])
})
