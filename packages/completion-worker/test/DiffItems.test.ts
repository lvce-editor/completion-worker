import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'

test('isEqual - same items and focusedIndex', () => {
  const oldState = {
    ...createDefaultState(),
    items: ['item1', 'item2'],
    focusedIndex: 1,
  }
  const newState = {
    ...oldState,
    focusedIndex: 1,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(true)
})

test('isEqual - different items', () => {
  const oldState = {
    ...createDefaultState(),
    items: ['item1', 'item2'],
    focusedIndex: 1,
  }
  const newState = {
    ...createDefaultState(),
    items: ['item1', 'item3'],
    focusedIndex: 1,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual - different focusedIndex', () => {
  const oldState = {
    ...createDefaultState(),
    items: ['item1', 'item2'],
    focusedIndex: 1,
  }
  const newState = {
    ...createDefaultState(),
    items: ['item1', 'item2'],
    focusedIndex: 0,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(false)
})
