import { test, expect } from '@jest/globals'
import { getCommandIds } from '../src/parts/GetCommandIds/GetCommandIds.ts'

test('getCommandIds returns the expected command IDs', () => {
  const expectedCommandIds = ['handleSliderPointerDown', 'handleSliderPointerMove', 'initialize']
  const result = getCommandIds()
  expect(result).toEqual(expectedCommandIds)
})
