import { test, expect } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems returns virtual dom for items', async () => {
  const item: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [0, 1, 2] }
  const oldState: CompletionState = createDefaultState()
  const newState: CompletionState = {
    ...createDefaultState(),
    items: [item],
    focusedIndex: 0,
  }
  // @ts-ignore
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getPositionAtCursor': () => ({ x: 100, y: 200 }),
    'Editor.getWordAtOffset2': () => 'test',
  })

  const result = renderItems(oldState, newState)
  expect(result).toBeDefined()
})

test('renderItems returns virtual dom for empty items', async () => {
  const oldState: CompletionState = createDefaultState()
  const newState: CompletionState = {
    ...createDefaultState(),
    items: [],
    focusedIndex: -1,
  }
  // @ts-ignore
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getPositionAtCursor': () => ({ x: 100, y: 200 }),
    'Editor.getWordAtOffset2': () => 'test',
  })

  const result = renderItems(oldState, newState)
  expect(result).toBeDefined()
})
