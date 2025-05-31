import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { close } from '../src/parts/Close/Close.js'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.js'
import * as WidgetId from '../src/parts/WidgetId/WidgetId.js'

test('close - calls closeWidget2 with correct parameters', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: unknown[]) => {
      if (method === 'Editor.closeWidget2') {
        expect(args[0]).toBe(1) // editorUid
        expect(args[1]).toBe(WidgetId.Completion)
        expect(args[2]).toBe('Completions')
        expect(args[3]).toBe(WhenExpression.FocusEditorCompletions)
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const state = {
    ...createDefaultState(),
    editorUid: 1,
  }
  const result = await close(state)
  expect(result).toBe(state)
})
