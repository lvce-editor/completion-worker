import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff } from '../src/parts/Diff/Diff.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('diff returns RenderItems when states are identical due to array reference differences', () => {
  const state1 = createDefaultState()
  const state2 = createDefaultState()

  const result = diff(state1, state2)

  // Even identical states return RenderItems because arrays are different references
  expect(result).toContain(DiffType.RenderItems)
})

test('diff returns RenderEventListeners when version differs', () => {
  const state1 = createDefaultState()
  const state2 = {
    ...createDefaultState(),
    version: 1, // Different version
  }

  const result = diff(state1, state2)

  expect(result).toContain(DiffType.RenderEventListeners)
})

test('diff returns RenderItems when items differ', () => {
  const state1 = createDefaultState()
  const state2 = {
    ...createDefaultState(),
    items: [{ label: 'test', kind: 1, flags: 0, matches: [] }],
  }

  const result = diff(state1, state2)

  expect(result).toContain(DiffType.RenderItems)
})

test('diff returns RenderItems when focusedIndex differs', () => {
  const state1 = createDefaultState()
  const state2 = {
    ...createDefaultState(),
    focusedIndex: 1, // Different focused index
  }

  const result = diff(state1, state2)

  expect(result).toContain(DiffType.RenderItems)
})

test('diff returns RenderBounds when bounds differ', () => {
  const state1 = createDefaultState()
  const state2 = {
    ...createDefaultState(),
    width: 100, // Different width
  }

  const result = diff(state1, state2)

  expect(result).toContain(DiffType.RenderBounds)
})

test('diff returns RenderUid when version differs', () => {
  const state1 = createDefaultState()
  const state2 = {
    ...createDefaultState(),
    version: 1, // Different version
  }

  const result = diff(state1, state2)

  expect(result).toContain(DiffType.RenderUid)
})

test('diff returns RenderFocusContext when version differs', () => {
  const state1 = createDefaultState()
  const state2 = {
    ...createDefaultState(),
    version: 1, // Different version
  }

  const result = diff(state1, state2)

  expect(result).toContain(DiffType.RenderFocusContext)
})

test('diff returns multiple types when multiple properties differ', () => {
  const state1 = createDefaultState()
  const state2 = {
    ...createDefaultState(),
    version: 1,
    focusedIndex: 1,
    width: 100,
  }

  const result = diff(state1, state2)

  expect(result).toContain(DiffType.RenderEventListeners)
  expect(result).toContain(DiffType.RenderFocusContext)
  expect(result).toContain(DiffType.RenderBounds)
  expect(result).toContain(DiffType.RenderItems)
  expect(result).toContain(DiffType.RenderUid)
  expect(result.length).toBeGreaterThan(1)
})
