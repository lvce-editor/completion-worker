import { test, expect, jest } from '@jest/globals'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { applyRender } from '../src/parts/ApplyRender/ApplyRender.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer from '../src/parts/GetRenderer/GetRenderer.ts'

test.skip('applyRender should return empty array for empty diffResult', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const diffResult: readonly number[] = []
  const result = applyRender(oldState, newState, diffResult)
  expect(result).toEqual([])
})

test.skip('applyRender should call getRenderer for each diff type', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const mockRenderer = jest.fn((oldState: CompletionState, newState: CompletionState): readonly any[] => {
    return ['mock command']
  })
  const getRendererSpy = jest.spyOn(GetRenderer, 'getRenderer').mockReturnValue(mockRenderer)

  const diffResult: readonly number[] = [DiffType.RenderContent, DiffType.RenderBounds]
  const result = applyRender(oldState, newState, diffResult)

  expect(getRendererSpy).toHaveBeenCalledTimes(2)
  expect(getRendererSpy).toHaveBeenCalledWith(DiffType.RenderContent)
  expect(getRendererSpy).toHaveBeenCalledWith(DiffType.RenderBounds)
  expect(result).toEqual([['mock command'], ['mock command']])

  getRendererSpy.mockRestore()
})

test.skip('applyRender should pass oldState and newState to renderer', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const mockRenderer = jest.fn((oldState: CompletionState, newState: CompletionState): readonly any[] => {
    return ['mock command']
  })
  const getRendererSpy = jest.spyOn(GetRenderer, 'getRenderer').mockReturnValue(mockRenderer)

  const diffResult: readonly number[] = [DiffType.RenderContent]
  applyRender(oldState, newState, diffResult)

  expect(mockRenderer).toHaveBeenCalledWith(oldState, newState)

  getRendererSpy.mockRestore()
})
