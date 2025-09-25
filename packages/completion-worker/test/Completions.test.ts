import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { getCompletions } from '../src/parts/Completions/Completions.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'

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
      if (method === 'Editor.getOffsetAtCursor') {
        return 0
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
    'Editor.getOffsetAtCursor': () => 0,
  })
  
  const result = await getCompletions(1, 'typescript')
  expect(result).toEqual(mockCompletions)
  
  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['ActivateByEvent.activateByEvent', 'onCompletion:typescript']
  ])
})

test('getCompletions returns empty array on error', async () => {
  // @ts-ignore
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
      if (method === 'Editor.getOffsetAtCursor') {
        return 0
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
    'Editor.getOffsetAtCursor': () => 0,
  })
  
  const result = await getCompletions(1, 'typescript')
  expect(result).toEqual([])
  expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to get completions:')
  expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('test error'))
  
  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['ActivateByEvent.activateByEvent', 'onCompletion:typescript']
  ])
  
  consoleErrorSpy.mockRestore()
})
