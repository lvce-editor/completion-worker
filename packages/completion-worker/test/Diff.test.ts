import { test, expect } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff } from '../src/parts/Diff/Diff.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('diff returns RenderItems when states are identical due to array reference differences', () => {
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = createDefaultState()
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff returns RenderEventListeners when version differs', () => {
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), version: 1 }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderEventListeners)
})

test('diff returns RenderItems when items differ', () => {
  const item: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), items: [item] }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff returns RenderItems when focusedIndex differs', () => {
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), focusedIndex: 1 }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff returns RenderItems when minLineY differs', () => {
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), minLineY: 1 }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff returns RenderItems when maxLineY differs', () => {
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), maxLineY: 1 }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff returns RenderBounds when bounds differ', () => {
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), width: 100 }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderBounds)
})

test('diff returns RenderBounds when x or y or height differ', () => {
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), height: 3, x: 1, y: 2 }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderBounds)
})

test('diff returns RenderUid when version differs', () => {
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), version: 1 }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderUid)
})

test('diff returns RenderFocusContext when version differs', () => {
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), version: 1 }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderFocusContext)
})

test('diff returns multiple types when multiple properties differ', () => {
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), focusedIndex: 1, version: 1, width: 100 }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderEventListeners)
  expect(result).toContain(DiffType.RenderFocusContext)
  expect(result).toContain(DiffType.RenderBounds)
  expect(result).toContain(DiffType.RenderItems)
  expect(result).toContain(DiffType.RenderUid)
  expect(result.length).toBeGreaterThan(1)
})

test('diff returns all types when all properties differ', () => {
  const item: CompletionItem = { flags: 0, kind: 1, label: 'test', matches: [] }
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = {
    ...createDefaultState(),
    focusedIndex: 2,
    height: 1,
    items: [item],
    maxLineY: 1,
    minLineY: 1,
    version: 2,
    width: 1,
    x: 1,
    y: 1,
  }
  const result = diff(state1, state2)
  expect(result).toContain(DiffType.RenderEventListeners)
  expect(result).toContain(DiffType.RenderFocusContext)
  expect(result).toContain(DiffType.RenderBounds)
  expect(result).toContain(DiffType.RenderItems)
  expect(result).toContain(DiffType.RenderUid)
})
