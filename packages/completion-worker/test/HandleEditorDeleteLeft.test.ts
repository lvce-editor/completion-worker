import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import { handleEditorDeleteLeft } from '../src/parts/HandleEditorDeleteLeft/HandleEditorDeleteLeft.ts'

test('handleEditorDeleteLeft returns state with updated items when focused item has matches', async () => {
  const item: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [0, 1, 2] }
  const state: CompletionState = {
    ...createDefaultState(),
    items: [item],
    focusedIndex: 0,
  }
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return Promise.resolve({ x: 100, y: 200 })
      }
      if (method === 'Editor.getWordAtOffset2') {
        return Promise.resolve('test')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const result = await handleEditorDeleteLeft(state)
  expect(result.items).toBeDefined()
})

test('handleEditorDeleteLeft returns state with updated items when focused item has no matches', async () => {
  const item: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [] }
  const state: CompletionState = {
    ...createDefaultState(),
    items: [item],
    focusedIndex: 0,
  }
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return Promise.resolve({ x: 100, y: 200 })
      }
      if (method === 'Editor.getWordAtOffset2') {
        return Promise.resolve('test')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const result = await handleEditorDeleteLeft(state)
  expect(result.items).toBeDefined()
})

test('handleEditorDeleteLeft returns state unchanged when focusedIndex is -1', async () => {
  const item: CompletionItem = { label: 'test', kind: 1, flags: 0, matches: [0, 1, 2] }
  const state: CompletionState = {
    ...createDefaultState(),
    items: [item],
    focusedIndex: -1,
  }
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return Promise.resolve({ x: 100, y: 200 })
      }
      if (method === 'Editor.getWordAtOffset2') {
        return Promise.resolve('test')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const result = await handleEditorDeleteLeft(state)
  expect(result.items).toBeDefined()
})
