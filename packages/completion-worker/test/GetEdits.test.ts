import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { getEdits } from '../src/parts/GetEdits/GetEdits.ts'

const createCompletionItem = (label: string): CompletionItem => ({
  flags: 0,
  kind: 1,
  label,
  matches: [],
})

test('getEdits - returns changes for simple completion', async () => {
  const mockLines = ['const hel']
  const mockSelections = [0, 5]
  const mockCompletion = createCompletionItem('hello')

  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => mockLines,
    'Editor.getOffsetAtCursor': () => 10,
    'Editor.getSelections2': () => mockSelections,
  })

  const result = await getEdits(1, 'hel', mockCompletion)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    deleted: ['nst'],
    end: { columnIndex: 5, rowIndex: 0 },
    inserted: ['hello'],
    origin: '',
    start: { columnIndex: 2, rowIndex: 0 },
  })

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['ActivateByEvent.activateByEvent', 'onCompletion:undefined'],
    ['Editor.getLines2', 1],
    ['Editor.getSelections2', 1],
  ])
})

test.skip('getEdits - returns changes with resolved snippet', async () => {
  const mockLines = ['const hel']
  const mockSelections = [0, 5]
  const mockCompletion = createCompletionItem('hello')

  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => mockLines,
    'Editor.getOffsetAtCursor': () => 10,
    'Editor.getSelections2': () => mockSelections,
  })

  const result = await getEdits(1, 'hel', mockCompletion)
  expect(result).toHaveLength(1)
  expect(result[0]).toMatchObject({
    inserted: ['hello()'],
  })

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['ActivateByEvent.activateByEvent', 'onCompletion:undefined'],
    ['Editor.getLines2', 1],
    ['Editor.getSelections2', 1],
  ])
})

test('getEdits - returns changes when resolved item is undefined', async () => {
  const mockLines = ['const hel']
  const mockSelections = [0, 5]
  const mockCompletion = createCompletionItem('hello')

  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => mockLines,
    'Editor.getOffsetAtCursor': () => 10,
    'Editor.getSelections2': () => mockSelections,
  })

  const result = await getEdits(1, 'hel', mockCompletion)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    deleted: ['nst'],
    end: { columnIndex: 5, rowIndex: 0 },
    inserted: ['hello'],
    origin: '',
    start: { columnIndex: 2, rowIndex: 0 },
  })

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['ActivateByEvent.activateByEvent', 'onCompletion:undefined'],
    ['Editor.getLines2', 1],
    ['Editor.getSelections2', 1],
  ])
})
