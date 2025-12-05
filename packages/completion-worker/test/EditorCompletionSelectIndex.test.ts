import { expect, test } from '@jest/globals'
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
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.applyEdit2': () => undefined,
    'Editor.closeWidget2': () => undefined,
    'Editor.getEdits': () => [],
    'Editor.getLines2': () => [''],
    'Editor.getSelections2': () => [0, 0, 0, 0],
  })

  const state: CompletionState = {
    ...createDefaultState(),
    editorUid: 1,
    items: [{ label: 'item1' }, { label: 'item2' }] as any,
    leadingWord: '',
  }
  const result = await selectIndex(state, 1)
  expect(result).toBe(state)

  expect(mockRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['Editor.getLines2', 1],
    ['Editor.getSelections2', 1],
    [
      'Editor.applyEdit2',
      1,
      [
        {
          deleted: [''],
          end: { columnIndex: 0, rowIndex: 0 },
          inserted: ['item2'],
          origin: '',
          start: { columnIndex: 0, rowIndex: 0 },
        },
      ],
    ],
    ['Editor.closeWidget2', 1, 3, 'Completions', 9],
  ])
})
