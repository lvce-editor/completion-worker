import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusPrevious } from '../src/parts/EditorCompletionFocusPrevious/EditorCompletionFocusPrevious.ts'

const completionItem = { flags: 0, kind: 0, label: '', matches: [] }

test('focusPrevious', () => {
  const state = {
    ...createDefaultState('test-application'),
    focusedIndex: 2,
    items: [completionItem, completionItem, completionItem],
  }
  const result = focusPrevious(state)
  expect(result.focusedIndex).toBe(1)
  expect(result.focused).toBe(true)
})
