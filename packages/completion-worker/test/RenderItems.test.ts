import { test, expect } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems returns virtual dom for items', async () => {
  const item: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [0, 1, 2] }
  const oldState: CompletionState = createDefaultState()
  const newState: CompletionState = {
    ...createDefaultState(),
    focusedIndex: 0,
    items: [item],
  }
  const result = renderItems(oldState, newState)
  expect(result).toBeDefined()
})

test('renderItems returns virtual dom for empty items', async () => {
  const oldState: CompletionState = createDefaultState()
  const newState: CompletionState = {
    ...createDefaultState(),
    focusedIndex: -1,
    items: [],
  }
  const result = renderItems(oldState, newState)
  expect(result).toBeDefined()
})
