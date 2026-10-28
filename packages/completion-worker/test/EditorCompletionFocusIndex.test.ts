import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusIndex } from '../src/parts/EditorCompletionFocusIndex/EditorCompletionFocusIndex.ts'

const completionItem = { flags: 0, kind: 0, label: '', matches: [] }

test('focusIndex', () => {
  const state = {
    ...createDefaultState('test-application'),
    items: [completionItem, completionItem, completionItem],
  }
  const result = focusIndex(state, 5)
  expect(result.focusedIndex).toBe(2)
  expect(result.focused).toBe(true)
})

test('focusIndex keeps the empty-list sentinel', () => {
  const state = createDefaultState('test-application')
  const result = focusIndex(state, 0)
  expect(result.focusedIndex).toBe(-1)
  expect(result.focused).toBe(true)
})

test('focusIndex clamps to the first item', () => {
  const state = {
    ...createDefaultState('test-application'),
    items: [completionItem, completionItem],
  }
  const result = focusIndex(state, -1)
  expect(result.focusedIndex).toBe(0)
  expect(result.focused).toBe(true)
})

test('focusIndex scrolls down to reveal the focused item', () => {
  const state = {
    ...createDefaultState('test-application'),
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
    ...createDefaultState('test-application'),
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
