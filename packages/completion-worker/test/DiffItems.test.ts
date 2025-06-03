import { expect, test } from '@jest/globals'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'

test('isEqual - same items and focusedIndex', () => {
  const oldState: CompletionState = {
    ...createDefaultState(),
    items: ['item1', 'item2'] as any[],
    focusedIndex: 1,
  }
  const newState: CompletionState = {
    ...oldState,
    focusedIndex: 1,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(true)
})

test('isEqual - different items', () => {
  const oldState: CompletionState = {
    ...createDefaultState(),
    items: ['item1', 'item2'] as any,
    focusedIndex: 1,
  }
  const newState: CompletionState = {
    ...createDefaultState(),
    items: ['item1', 'item3'] as any,
    focusedIndex: 1,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual - different focusedIndex', () => {
  const oldState: CompletionState = {
    ...createDefaultState(),
    items: ['item1', 'item2'] as any,
    focusedIndex: 1,
  }
  const newState: CompletionState = {
    ...createDefaultState(),
    items: ['item1', 'item2'] as any,
    focusedIndex: 0,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(false)
})
