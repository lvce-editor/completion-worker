import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusLast } from '../src/parts/EditorCompletionFocusLast/EditorCompletionFocusLast.ts'

test('focusLast', () => {
  const state = {
    ...createDefaultState(),
    finalDeltaY: 140,
    height: 60,
    items: Array.from({ length: 10 }, () => ({})),
    maxLineY: 3,
  }
  const result = focusLast(state as any)
  expect(result).toMatchObject({
    deltaY: 140,
    focused: true,
    focusedIndex: 9,
    maxLineY: 10,
    minLineY: 7,
  })
})
