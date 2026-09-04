import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusLast } from '../src/parts/EditorCompletionFocusLast/EditorCompletionFocusLast.ts'

test('focusLast', () => {
  const state = {
    ...createDefaultState(),
    items: [{}, {}, {}],
  }
  const result = focusLast(state as any)
  expect(result.focusedIndex).toBe(2)
  expect(result.focused).toBe(true)
})
