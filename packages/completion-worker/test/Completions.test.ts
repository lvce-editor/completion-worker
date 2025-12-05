import { expect, jest, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { getCompletions } from '../src/parts/Completions/Completions.ts'

test('getCompletions returns completions successfully', async () => {
  const mockCompletions = [
    {
      flags: 0,
      kind: 1,
      label: 'test',
      matches: [0, 1, 2, 3],
    },
  ]
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Editor.getOffsetAtCursor': () => 0,
    'ExtensionHostCompletion.execute': () => mockCompletions,
    'GetOffsetAtCursor.getOffsetAtCursor': () => 10,
  })

  const mockEditorRpc = EditorWorker.registerMockRpc({
    'ActivateByEvent.activateByEvent': () => undefined,
    'Editor.getOffsetAtCursor': () => 0,
  })

  const result = await getCompletions(1, 'typescript')
  expect(result).toEqual(mockCompletions)

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['ActivateByEvent.activateByEvent', 'onCompletion:typescript'],
  ])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.execute', 1, 0]])
})

test('getCompletions returns empty array on error', async () => {
  // @ts-ignore
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'Editor.getOffsetAtCursor': () => 0,
    'ExtensionHostCompletion.execute': () => {
      throw new Error('test error')
    },
    'GetOffsetAtCursor.getOffsetAtCursor': () => 10,
  })

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
    ['ActivateByEvent.activateByEvent', 'onCompletion:typescript'],
  ])
  expect(mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.execute', 1, 0]])

  consoleErrorSpy.mockRestore()
})
