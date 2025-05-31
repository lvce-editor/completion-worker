import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusPrevious } from '../src/parts/EditorCompletionFocusPrevious/EditorCompletionFocusPrevious.ts'

test('focusPrevious', () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 2,
  }
  const result = focusPrevious(state)
  expect(result.focusedIndex).toBe(1)
  expect(result.focused).toBe(true)
})
