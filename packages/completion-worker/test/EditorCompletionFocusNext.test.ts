import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusNext } from '../src/parts/EditorCompletionFocusNext/EditorCompletionFocusNext.ts'

test('focusNext', () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: 1,
  }
  const result = focusNext(state)
  expect(result.focusedIndex).toBe(2)
  expect(result.focused).toBe(true)
})
