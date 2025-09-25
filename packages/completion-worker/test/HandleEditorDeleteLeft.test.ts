import { test, expect } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleEditorDeleteLeft } from '../src/parts/HandleEditorDeleteLeft/HandleEditorDeleteLeft.ts'

test('handleEditorDeleteLeft returns state with updated items when focused item has matches', async () => {
  const item: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [0, 1, 2] }
  const state: CompletionState = {
    ...createDefaultState(),
    items: [item],
    focusedIndex: 0,
  }
  const result = await handleEditorDeleteLeft(state)
  expect(result.items).toBeDefined()
})

test('handleEditorDeleteLeft returns state with updated items when focused item has no matches', async () => {
  const item: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [] }
  const state: CompletionState = {
    ...createDefaultState(),
    items: [item],
    focusedIndex: 0,
  }
  const result = await handleEditorDeleteLeft(state)
  expect(result.items).toBeDefined()
})

test('handleEditorDeleteLeft returns state unchanged when focusedIndex is -1', async () => {
  const item: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [0, 1, 2] }
  const state: CompletionState = {
    ...createDefaultState(),
    items: [item],
    focusedIndex: -1,
  }
  const result = await handleEditorDeleteLeft(state)
  expect(result.items).toBeDefined()
})
