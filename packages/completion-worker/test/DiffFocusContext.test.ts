import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffFocusContext/DiffFocusContext.ts'

test('isEqual - same version', () => {
  const oldState = {
    ...createDefaultState(),
    version: 1,
  }
  const newState = {
    ...createDefaultState(),
    version: 1,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(true)
})

test('isEqual - different version', () => {
  const oldState = {
    ...createDefaultState(),
    version: 1,
  }
  const newState = {
    ...createDefaultState(),
    version: 2,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(false)
})
