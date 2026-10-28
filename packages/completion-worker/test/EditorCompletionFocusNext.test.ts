import { test, expect } from '@jest/globals'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusNext } from '../src/parts/EditorCompletionFocusNext/EditorCompletionFocusNext.ts'

const completionItem = { flags: 0, kind: 0, label: '', matches: [] }

test('focusNext', () => {
  const state = {
    ...createDefaultState('test-application'),
    focusedIndex: 1,
    items: [completionItem, completionItem, completionItem],
  }
  const result = focusNext(state)
  expect(result.focusedIndex).toBe(2)
  expect(result.focused).toBe(true)
})

test.each([0, 1, 2])('focusNext stays within %i completion items after repeated movement', (count) => {
  let state: CompletionState = {
    ...createDefaultState('test-application'),
    focusedIndex: count === 0 ? -1 : 0,
    items: Array.from({ length: count }).fill(completionItem),
  }
  const validIndices = count === 0 ? [-1] : Array.from({ length: count }, (_, index) => index)
  for (let i = 0; i < 5; i++) {
    state = focusNext(state)
    const { focusedIndex } = state
    expect(validIndices).toContain(focusedIndex)
  }
})
