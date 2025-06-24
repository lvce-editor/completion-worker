import { test, expect } from '@jest/globals'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import * as CompletionStates from '../src/parts/CompletionStates/CompletionStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff2 } from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('diff2 returns [1] when states are identical due to array reference differences', () => {
  const uid = 1
  const oldState: CompletionState = createDefaultState()
  const newState: CompletionState = createDefaultState()
  CompletionStates.set(uid, oldState, newState)
  const result = diff2(uid)
  expect(result).toEqual([DiffType.RenderItems])
})

test('diff2 returns [RenderEventListeners, RenderItems, RenderUid, RenderFocusContext] when version differs', () => {
  const uid = 2
  const oldState: CompletionState = createDefaultState()
  const newState: CompletionState = { ...createDefaultState(), version: 1 }
  CompletionStates.set(uid, oldState, newState)
  const result = diff2(uid)
  expect(result).toEqual([DiffType.RenderEventListeners, DiffType.RenderItems, DiffType.RenderUid, DiffType.RenderFocusContext])
})

test('diff2 returns [RenderItems] when items differ', () => {
  const uid = 3
  const oldState: CompletionState = createDefaultState()
  const newState: CompletionState = { ...createDefaultState(), items: [{ label: 'a', kind: 1, flags: 0, matches: [] }] }
  CompletionStates.set(uid, oldState, newState)
  const result = diff2(uid)
  expect(result).toEqual([DiffType.RenderItems])
})

test('diff2 returns [RenderEventListeners, RenderItems, RenderUid, RenderFocusContext] when version and items differ', () => {
  const uid = 4
  const oldState: CompletionState = createDefaultState()
  const newState: CompletionState = { ...createDefaultState(), version: 2, items: [{ label: 'b', kind: 2, flags: 1, matches: [1] }] }
  CompletionStates.set(uid, oldState, newState)
  const result = diff2(uid)
  expect(result).toEqual([DiffType.RenderEventListeners, DiffType.RenderItems, DiffType.RenderUid, DiffType.RenderFocusContext])
})
