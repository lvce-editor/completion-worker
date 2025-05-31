import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusFirst } from '../src/parts/EditorCompletionFocusFirst/EditorCompletionFocusFirst.ts'

test('focusFirst', () => {
  const state = createDefaultState()
  const result = focusFirst(state)
  expect(result.focusedIndex).toBe(0)
  expect(result.focused).toBe(true)
})
