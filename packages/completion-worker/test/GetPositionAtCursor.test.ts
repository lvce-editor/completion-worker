import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { set } from '../src/parts/EditorWorker/EditorWorker.ts'
import { getPositionAtCursor } from '../src/parts/GetPositionAtCursor/GetPositionAtCursor.ts'

test('getPositionAtCursor - returns position at cursor', async () => {
  const mockPosition = {
    x: 100,
    y: 200,
    rowIndex: 5,
    columnIndex: 10,
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return mockPosition
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(mockRpc)

  const result = await getPositionAtCursor(1)
  expect(result).toEqual(mockPosition)
})

test('getPositionAtCursor - returns position at start of document', async () => {
  const mockPosition = {
    x: 0,
    y: 0,
    rowIndex: 0,
    columnIndex: 0,
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return mockPosition
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(mockRpc)

  const result = await getPositionAtCursor(1)
  expect(result).toEqual(mockPosition)
})
