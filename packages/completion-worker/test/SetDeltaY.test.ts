import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setDeltaY } from '../src/parts/SetDeltaY/SetDeltaY.ts'

test('setDeltaY should update state with new deltaY when modified', () => {
  const state = createDefaultState()
  const newState = setDeltaY(state, 100)
  expect(newState.deltaY).toBe(0)
  expect(newState.minLineY).toBeDefined()
  expect(newState.maxLineY).toBeDefined()
})

test('setDeltaY should return same state when not modified', () => {
  const state = createDefaultState()
  const newState = setDeltaY(state, 0)
  expect(newState).toBe(state)
})
