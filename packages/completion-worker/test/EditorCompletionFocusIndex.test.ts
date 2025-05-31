import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusIndex } from '../src/parts/EditorCompletionFocusIndex/EditorCompletionFocusIndex.ts'

test('focusIndex', () => {
  const state = createDefaultState()
  const result = focusIndex(state, 5)
  expect(result.focusedIndex).toBe(5)
  expect(result.focused).toBe(true)
})
