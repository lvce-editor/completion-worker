import { test, expect } from '@jest/globals'
import { applyRender } from '../src/parts/ApplyRender/ApplyRender.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('applyRender should return empty array for empty diffResult', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const diffResult: readonly number[] = []
  const result = applyRender(oldState, newState, diffResult)
  expect(result).toEqual([])
})

test('applyRender should apply each diff type', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const diffResult: readonly number[] = [DiffType.RenderContent, DiffType.RenderBounds]
  const result = applyRender(oldState, newState, diffResult)

  expect(result).toEqual([
    [RenderMethod.SetDom2, 0, []],
    [RenderMethod.SetBounds, 0, 0, 0, 0, 0],
  ])
})

test('applyRender should pass newState to renderer', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    height: 40,
    uid: 7,
    width: 20,
    x: 10,
    y: 30,
  }
  const diffResult: readonly number[] = [DiffType.RenderBounds]
  const result = applyRender(oldState, newState, diffResult)

  expect(result).toEqual([[RenderMethod.SetBounds, 7, 10, 30, 20, 40]])
})
