import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderFocusContext } from '../src/parts/RenderFocusContext/RenderFocusContext.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'

test('renderFocusContext', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual(['Viewlet.setFocusContext', WhenExpression.FocusEditorRename])
})
