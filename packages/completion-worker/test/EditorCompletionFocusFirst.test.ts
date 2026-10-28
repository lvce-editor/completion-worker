import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusFirst } from '../src/parts/EditorCompletionFocusFirst/EditorCompletionFocusFirst.ts'

const completionItem = { flags: 0, kind: 0, label: '', matches: [] }

test('focusFirst', () => {
  const state = {
    ...createDefaultState('test-application'),
    items: [completionItem],
    maxLineY: 1,
  }
  const result = focusFirst(state)
  expect(result.focusedIndex).toBe(0)
  expect(result.focused).toBe(true)
})
