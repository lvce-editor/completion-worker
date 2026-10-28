import { test, expect } from '@jest/globals'
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
