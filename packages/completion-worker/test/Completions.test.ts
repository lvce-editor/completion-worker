import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { getCompletions } from '../src/parts/Completions/Completions.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'

test('getCompletions returns completions successfully', async () => {
  const mockCompletions = [
    {
      label: 'test',
      kind: 1,
      flags: 0,
      matches: [0, 1, 2, 3],
    },
  ]
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetOffsetAtCursor.getOffsetAtCursor') {
        return 10
      }
      if (method === 'ExtensionHostCompletion.execute') {
        return mockCompletions
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ActivateByEvent.activateByEvent') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  const result = await getCompletions(1, 'typescript')
  expect(result).toEqual(mockCompletions)
})

test('getCompletions returns empty array on error', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetOffsetAtCursor.getOffsetAtCursor') {
        return 10
      }
      if (method === 'ExtensionHostCompletion.execute') {
        throw new Error('test error')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ActivateByEvent.activateByEvent') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  const result = await getCompletions(1, 'typescript')
  expect(result).toEqual([])
  expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to get completions:')
  expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('test error'))
  consoleErrorSpy.mockRestore()
})
