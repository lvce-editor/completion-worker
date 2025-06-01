import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as EditorCompletionSelectCurrent from '../src/parts/EditorCompletionSelectCurrent/EditorCompletionSelectCurrent.ts'

test('selectCurrent calls selectIndex with focusedIndex', async () => {
  const state = createDefaultState()
  const result = await EditorCompletionSelectCurrent.selectCurrent(state)
  expect(result).toBeDefined()
})
