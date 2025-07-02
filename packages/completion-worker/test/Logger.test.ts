import { test, expect, jest } from '@jest/globals'
import { error } from '../src/parts/Logger/Logger.ts'

test('error should log to console.error', () => {
  // @ts-ignore
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  error('test error')
  expect(consoleErrorSpy).toHaveBeenCalledWith('test error')
  consoleErrorSpy.mockRestore()
})

test('error should handle non-string messages', () => {
  // @ts-ignore
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const errorObj = new Error('test error')
  error(errorObj)
  expect(consoleErrorSpy).toHaveBeenCalledWith(errorObj)
  consoleErrorSpy.mockRestore()
})
