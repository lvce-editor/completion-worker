import { test, expect } from '@jest/globals'
import { handleWheel } from '../src/parts/HandleWheel/HandleWheel.ts'

test('handleWheel', () => {
  const state = {
    deltaY: 10,
    endIndex: 0,
    finalDeltaY: 0,
    headerHeight: 0,
    height: 100,
    itemCount: 0,
    itemHeight: 20,
    items: [],
    maxLineY: 0,
    minLineY: 0,
    scrollTop: 0,
    startIndex: 0,
    visibleItems: [],
    width: 100,
    x: 0,
    y: 0,
  }
  const result = handleWheel(state, 0, 5)
  expect(result.deltaY).toBe(0)
})
