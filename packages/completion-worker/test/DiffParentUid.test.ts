import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffParentUid/DiffParentUid.ts'

test('isEqual returns true when versions match', () => {
  const state1 = {
    ...createDefaultState(),
    version: 1,
  }
  const state2 = {
    ...createDefaultState(),
    version: 1,
  }
  expect(isEqual(state1, state2)).toBe(true)
})

test('isEqual returns false when versions do not match', () => {
  const state1 = {
    ...createDefaultState(),
    version: 1,
  }
  const state2 = {
    ...createDefaultState(),
    version: 2,
  }
  expect(isEqual(state1, state2)).toBe(false)
})
