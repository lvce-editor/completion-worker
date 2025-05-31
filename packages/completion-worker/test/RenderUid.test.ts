import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'
import { renderUid } from '../src/parts/RenderUid/RenderUid.ts'

test('renderUid', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    uid: 123,
    editorUid: 456,
  }
  const result = renderUid(oldState, newState)
  expect(result).toEqual([RenderMethod.SetUid, 123, 456])
})
