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
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'GetOffsetAtCursor.getOffsetAtCursor': () => 10,
    'ExtensionHostCompletion.execute': () => mockCompletions,
    'Editor.getOffsetAtCursor': () => 0,
  })

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
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'GetOffsetAtCursor.getOffsetAtCursor': () => 10,
    'ExtensionHostCompletion.execute': () => {
      throw new Error('test error')
    },
    'Editor.getOffsetAtCursor': () => 0,
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
    ['ActivateByEvent.activateByEvent', 'onCompletion:typescript']
  ])

  consoleErrorSpy.mockRestore()
})
