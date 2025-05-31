import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffBounds/DiffBounds.ts'

test('isEqual - same bounds', () => {
  const oldState = {
    ...createDefaultState(),
    x: 100,
    y: 200,
    width: 300,
    height: 400,
  }
  const newState = {
    ...createDefaultState(),
    x: 100,
    y: 200,
    width: 300,
    height: 400,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(true)
})

test('isEqual - different bounds', () => {
  const oldState = {
    ...createDefaultState(),
    x: 100,
    y: 200,
    width: 300,
    height: 400,
  }
  const newState = {
    ...createDefaultState(),
    x: 101,
    y: 201,
    width: 301,
    height: 401,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(false)
})
