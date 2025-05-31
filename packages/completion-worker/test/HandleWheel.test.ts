import { test, expect } from '@jest/globals'
import { handleWheel } from '../src/parts/HandleWheel/HandleWheel.ts'

test('handleWheel', () => {
  const state = {
    itemHeight: 20,
    items: [],
    height: 100,
    finalDeltaY: 0,
    deltaY: 10,
    scrollTop: 0,
    visibleItems: [],
    startIndex: 0,
    endIndex: 0,
    itemCount: 0,
    headerHeight: 0,
    minLineY: 0,
    maxLineY: 0,
    x: 0,
    y: 0,
    width: 100,
  }
  const result = handleWheel(state, 0, 5)
  expect(result.deltaY).toBe(0)
})
