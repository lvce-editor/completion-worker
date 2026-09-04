import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusIndex } from '../src/parts/EditorCompletionFocusIndex/EditorCompletionFocusIndex.ts'

test('focusIndex', () => {
  const state = createDefaultState()
  const result = focusIndex(state, 5)
  expect(result.focusedIndex).toBe(5)
  expect(result.focused).toBe(true)
})

test('focusIndex scrolls down to reveal the focused item', () => {
  const state = {
    ...createDefaultState(),
    finalDeltaY: 140,
    height: 60,
    items: Array.from({ length: 10 }, () => ({})),
    maxLineY: 3,
  }
  const result = focusIndex(state as any, 9)
  expect(result).toMatchObject({
    deltaY: 140,
    focused: true,
    focusedIndex: 9,
    maxLineY: 10,
    minLineY: 7,
  })
})

test('focusIndex scrolls up to reveal the focused item', () => {
  const state = {
    ...createDefaultState(),
    deltaY: 140,
    finalDeltaY: 140,
    height: 60,
    items: Array.from({ length: 10 }, () => ({})),
    maxLineY: 10,
    minLineY: 7,
  }
  const result = focusIndex(state as any, 0)
  expect(result).toMatchObject({
    deltaY: 0,
    focused: true,
    focusedIndex: 0,
    maxLineY: 4,
    minLineY: 0,
  })
})
