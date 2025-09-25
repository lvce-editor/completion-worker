import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { close } from '../src/parts/Close/Close.js'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.js'
import * as WidgetId from '../src/parts/WidgetId/WidgetId.js'

test('close - calls closeWidget2 with correct parameters', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.closeWidget2': () => undefined,
  })

  const state = {
    ...createDefaultState(),
    editorUid: 1,
  }
  const result = await close(state)
  expect(result).toBe(state)

  expect(mockRpc.invocations).toEqual([
    ['Editor.closeWidget2', 1, WidgetId.Completion, 'Completions', WhenExpression.FocusEditorCompletions]
  ])
})
