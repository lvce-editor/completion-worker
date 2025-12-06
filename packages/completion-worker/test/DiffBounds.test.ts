import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffBounds/DiffBounds.ts'

test('isEqual - same bounds', () => {
  const oldState = {
    ...createDefaultState(),
    height: 400,
    width: 300,
    x: 100,
    y: 200,
  }
  const newState = {
    ...createDefaultState(),
    height: 400,
    width: 300,
    x: 100,
    y: 200,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(true)
})

test('isEqual - different bounds', () => {
  const oldState = {
    ...createDefaultState(),
    height: 400,
    width: 300,
    x: 100,
    y: 200,
  }
  const newState = {
    ...createDefaultState(),
    height: 401,
    width: 301,
    x: 101,
    y: 201,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(false)
})
