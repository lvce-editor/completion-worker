import { test, expect } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { openDetails } from '../src/parts/EditorCompletionOpenDetails/EditorCompletionOpenDetails.ts'

test('openDetails returns state with focused item details opened', async () => {
  const item: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const state: CompletionState = {
    ...createDefaultState(),
    focusedIndex: 0,
    items: [item],
  }
  const result = await openDetails(state)
  expect(result).toBe(state)
})

test('openDetails returns state when no items', async () => {
  const state: CompletionState = createDefaultState()
  const result = await openDetails(state)
  expect(result).toBe(state)
})

test('openDetails returns state when focusedIndex is -1', async () => {
  const item: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const state: CompletionState = {
    ...createDefaultState(),
    focusedIndex: -1,
    items: [item],
  }
  const result = await openDetails(state)
  expect(result).toBe(state)
})

test('openDetails returns state when focusedIndex is out of bounds', async () => {
  const item: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const state: CompletionState = {
    ...createDefaultState(),
    focusedIndex: 5,
    items: [item],
  }
  const result = await openDetails(state)
  expect(result).toBe(state)
})
