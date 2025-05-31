import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { close } from '../src/parts/Close/Close.js'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.js'
import * as WidgetId from '../src/parts/WidgetId/WidgetId.js'

test('close - calls closeWidget2 with correct parameters', async () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  EditorWorker.set(mockRpc)

  const state = {
    ...createDefaultState(),
    editorUid: 1,
  }
  const result = await close(state)
  expect(result).toBe(state)
  expect(invoke).toHaveBeenCalledWith('Editor.closeWidget2', 1, WidgetId.Completion, 'Completions', WhenExpression.FocusEditorCompletions)
})
