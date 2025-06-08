import { expect, test } from '@jest/globals'
import * as CompletionStates from '../src/parts/CompletionStates/CompletionStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'

test('render2 returns commands from applyRender', () => {
  const oldState = createDefaultState()
  const diffResult = [DiffType.RenderItems]
  const uid = 1

  CompletionStates.set(uid, oldState, oldState)
  const result = render2(uid, diffResult)

  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
})
