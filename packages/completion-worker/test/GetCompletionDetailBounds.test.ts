import { test, expect } from '@jest/globals'
import type { Bounds } from '../src/parts/GetCompletionDetailBounds/GetCompletionDetailBounds.ts'
import { getCompletionDetailBounds } from '../src/parts/GetCompletionDetailBounds/GetCompletionDetailBounds.ts'

test('getCompletionDetailBounds', () => {
  const completionBounds: Bounds = {
    height: 400,
    width: 300,
    x: 100,
    y: 200,
  }

  const borderSize = 10

  const result = getCompletionDetailBounds(completionBounds, borderSize)

  expect(result).toEqual({
    height: 100,
    width: 100,
    x: 390, // 100 + 300 - 10
    y: 200,
  })
})
