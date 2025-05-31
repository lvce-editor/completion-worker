import { test, expect } from '@jest/globals'
import type { Bounds } from '../src/parts/GetCompletionDetailBounds/GetCompletionDetailBounds.ts';
import { getCompletionDetailBounds } from '../src/parts/GetCompletionDetailBounds/GetCompletionDetailBounds.ts'

test('getCompletionDetailBounds', () => {
  const completionBounds: Bounds = {
    x: 100,
    y: 200,
    width: 300,
    height: 400,
  }

  const borderSize = 10

  const result = getCompletionDetailBounds(completionBounds, borderSize)

  expect(result).toEqual({
    x: 390, // 100 + 300 - 10
    y: 200,
    width: 100,
    height: 100,
  })
})
