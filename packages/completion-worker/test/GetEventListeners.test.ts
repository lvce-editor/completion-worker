import { test, expect } from '@jest/globals'
import { getEventListeners } from '../src/parts/GetEventListeners/GetEventListeners.ts'

test('getEventListeners', () => {
  const result = getEventListeners()
  expect(result).toBeDefined()
})

test('pointer down listener dispatches the registered pointer command', () => {
  const result = getEventListeners()
  const pointerDown = result.find((listener) => listener.name === 1)
  expect(pointerDown?.params[0]).toBe('EditorCompletion.handlePointerDown')
})
