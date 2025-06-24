import { test, expect } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import * as CompletionStates from '../src/parts/CompletionStates/CompletionStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff2 } from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('diff2 returns RenderItems when states are identical due to array reference differences', () => {
  const uid = 1
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = createDefaultState()
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff2 returns RenderEventListeners when version differs', () => {
  const uid = 2
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), version: 1 }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderEventListeners)
})

test('diff2 returns RenderItems when items differ', () => {
  const uid = 3
  const item: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [] }
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), items: [item] }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff2 returns RenderItems when focusedIndex differs', () => {
  const uid = 4
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), focusedIndex: 1 }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff2 returns RenderItems when minLineY differs', () => {
  const uid = 5
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), minLineY: 1 }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff2 returns RenderItems when maxLineY differs', () => {
  const uid = 6
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), maxLineY: 1 }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff2 returns RenderBounds when bounds differ', () => {
  const uid = 7
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), width: 100 }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderBounds)
})

test('diff2 returns RenderBounds when x or y or height differ', () => {
  const uid = 8
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), x: 1, y: 2, height: 3 }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderBounds)
})

test('diff2 returns RenderUid when version differs', () => {
  const uid = 9
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), version: 1 }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderUid)
})

test('diff2 returns RenderFocusContext when version differs', () => {
  const uid = 10
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), version: 1 }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderFocusContext)
})

test('diff2 returns multiple types when multiple properties differ', () => {
  const uid = 11
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = { ...createDefaultState(), version: 1, focusedIndex: 1, width: 100 }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderEventListeners)
  expect(result).toContain(DiffType.RenderFocusContext)
  expect(result).toContain(DiffType.RenderBounds)
  expect(result).toContain(DiffType.RenderItems)
  expect(result).toContain(DiffType.RenderUid)
  expect(result.length).toBeGreaterThan(1)
})

test('diff2 returns all types when all properties differ', () => {
  const uid = 12
  const item: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [] }
  const state1: CompletionState = createDefaultState()
  const state2: CompletionState = {
    ...createDefaultState(),
    version: 2,
    items: [item],
    focusedIndex: 2,
    minLineY: 1,
    maxLineY: 1,
    x: 1,
    y: 1,
    width: 1,
    height: 1,
  }
  CompletionStates.set(uid, state1, state2)
  const result = diff2(uid)
  expect(result).toContain(DiffType.RenderEventListeners)
  expect(result).toContain(DiffType.RenderFocusContext)
  expect(result).toContain(DiffType.RenderBounds)
  expect(result).toContain(DiffType.RenderItems)
  expect(result).toContain(DiffType.RenderUid)
})
