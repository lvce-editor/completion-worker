import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { getPositionAtCursor } from '../src/parts/GetPositionAtCursor/GetPositionAtCursor.ts'

test('getPositionAtCursor - returns position at cursor', async () => {
  const mockPosition = {
    columnIndex: 10,
    rowIndex: 5,
    x: 100,
    y: 200,
  }

  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getPositionAtCursor': () => mockPosition,
  })

  const result = await getPositionAtCursor(1)
  expect(result).toEqual(mockPosition)
  expect(mockRpc.invocations).toEqual([['Editor.getPositionAtCursor', 1]])
})

test('getPositionAtCursor - returns position at start of document', async () => {
  const mockPosition = {
    columnIndex: 0,
    rowIndex: 0,
    x: 0,
    y: 0,
  }

  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getPositionAtCursor': () => mockPosition,
  })

  const result = await getPositionAtCursor(1)
  expect(result).toEqual(mockPosition)
  expect(mockRpc.invocations).toEqual([['Editor.getPositionAtCursor', 1]])
})
