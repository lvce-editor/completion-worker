import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import { selectIndex } from '../src/parts/EditorCompletionSelectIndex/EditorCompletionSelectIndex.js'

test('selectIndex - returns same state when index is -1', async () => {
  const state = createDefaultState()
  const result = await selectIndex(state, -1)
  expect(result).toBe(state)
})

test('selectIndex - throws error when index is too large', async () => {
  const state = createDefaultState()
  await expect(selectIndex(state, 100)).rejects.toThrow('index too large')
})

test('selectIndex - selects item at given index', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getEdits') {
        return Promise.resolve([])
      }
      if (method === 'Editor.getLines2') {
        return Promise.resolve([''])
      }
      if (method === 'Editor.getSelections2') {
        return Promise.resolve([0, 0, 0, 0])
      }
      if (method === 'Editor.applyEdit2') {
        return Promise.resolve()
      }
      if (method === 'Editor.closeWidget2') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const state: CompletionState = {
    ...createDefaultState(),
    items: [{ label: 'item1' }, { label: 'item2' }] as any,
    editorUid: 1,
    leadingWord: '',
  }
  const result = await selectIndex(state, 1)
  expect(result).toBe(state)
})
