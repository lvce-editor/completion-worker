import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { getCompletions } from '../src/parts/Completions/Completions.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'

test.skip('getCompletions returns completions successfully', async () => {
  const mockCompletions = [
    {
      label: 'test',
      kind: 1,
      flags: 0,
      matches: [0, 1, 2, 3],
    },
  ]

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetOffsetAtCursor.getOffsetAtCursor') {
        return 10
      }
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return mockCompletions
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHostWorker.set(mockRpc)

  const result = await getCompletions(1, 'typescript')
  expect(result).toEqual(mockCompletions)
})

test.skip('getCompletions returns empty array on error', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetOffsetAtCursor.getOffsetAtCursor') {
        return 10
      }
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        throw new Error('test error')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHostWorker.set(mockRpc)

  const result = await getCompletions(1, 'typescript')
  expect(result).toEqual([])
  expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to get completions:')
  expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('test error'))

  consoleErrorSpy.mockRestore()
})
