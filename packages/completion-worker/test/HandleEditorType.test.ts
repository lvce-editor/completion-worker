import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import { handleEditorType } from '../src/parts/HandleEditorType/HandleEditorType.js'

test('handleEditorType - basic functionality', async () => {
  const mockPosition = {
    x: 100,
    y: 200,
    rowIndex: 5,
    columnIndex: 10,
  }
  const mockWord = 'test'

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      if (method === 'Editor.getPositionAtCursor') {
        return mockPosition
      }
      if (method === 'Editor.getWordBefore2') {
        return mockWord
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const state = createDefaultState()
  const result = await handleEditorType(state)

  expect(result).toBeDefined()
  expect(result.items).toBeDefined()
  expect(result.x).toBeDefined()
  expect(result.y).toBeDefined()
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBeLessThanOrEqual(8)
  expect(result.leadingWord).toBeDefined()
  expect(result.height).toBeDefined()
  expect(result.finalDeltaY).toBeDefined()
})

test('handleEditorType - with position and word', async () => {
  const mockPosition = {
    x: 100,
    y: 200,
    rowIndex: 5,
    columnIndex: 10,
  }
  const mockWord = 'test'

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return mockPosition
      }
      if (method === 'Editor.getWordBefore2') {
        return mockWord
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const state = createDefaultState()
  const result = await handleEditorType(state)

  expect(result.x).toBe(mockPosition.x)
  expect(result.y).toBe(mockPosition.y)
  expect(result.leadingWord).toBe(mockWord)
})

test('handleEditorType - with filtered items', async () => {
  const mockPosition = {
    x: 100,
    y: 200,
    rowIndex: 5,
    columnIndex: 10,
  }
  const mockWord = 'test'
  const mockItems = [
    { label: 'test1', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
    { label: 'test2', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
    { label: 'other', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
  ]

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return mockPosition
      }
      if (method === 'Editor.getWordBefore2') {
        return mockWord
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const state = {
    ...createDefaultState(),
    unfilteredItems: mockItems,
  }
  const result = await handleEditorType(state)

  expect(result.items).toHaveLength(2)
  expect(result.items[0].label).toBe('test1')
  expect(result.items[1].label).toBe('test2')
})
