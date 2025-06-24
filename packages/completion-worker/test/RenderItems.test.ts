import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems returns virtual dom for items', async () => {
  const item: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [0, 1, 2] }
  const oldState: CompletionState = createDefaultState()
  const newState: CompletionState = {
    ...createDefaultState(),
    items: [item],
    focusedIndex: 0,
  }
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return { x: 100, y: 200 }
      }
      if (method === 'Editor.getWordAtOffset2') {
        return 'test'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

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
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return { x: 100, y: 200 }
      }
      if (method === 'Editor.getWordAtOffset2') {
        return 'test'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const result = renderItems(oldState, newState)
  expect(result).toBeDefined()
})
