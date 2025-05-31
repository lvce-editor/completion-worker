import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderContent } from '../src/parts/RenderContent/RenderContent.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renderContent', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    uid: 1,
  }

  const result = renderContent(oldState, newState)

  expect(result).toEqual([RenderMethod.SetDom2, 1, expect.anything()])
})
