import { test, expect, jest } from '@jest/globals'
import { terminate } from '../src/parts/Terminate/Terminate.ts'

test('terminate', () => {
  const mockClose = jest.fn()
  globalThis.close = mockClose
  terminate()
  expect(mockClose).toHaveBeenCalled()
})
