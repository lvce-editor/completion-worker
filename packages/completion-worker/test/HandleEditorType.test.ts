import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import { handleEditorType } from '../src/parts/HandleEditorType/HandleEditorType.js'

test('handleEditorType - basic functionality', async () => {
  const mockPosition = {
    columnIndex: 10,
    rowIndex: 5,
    x: 100,
    y: 200,
  }
  const mockWord = 'test'

  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getPositionAtCursor': () => mockPosition,
    'Editor.getWordBefore2': () => mockWord,
    'FileSystem.readDirWithFileTypes': () => [],
  })

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

  expect(mockRpc.invocations).toEqual([
    ['Editor.getPositionAtCursor', 0],
    ['Editor.getWordBefore2', 0, 5, 10],
  ])
})

test('handleEditorType - with position and word', async () => {
  const mockPosition = {
    columnIndex: 10,
    rowIndex: 5,
    x: 100,
    y: 200,
  }
  const mockWord = 'test'

  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getPositionAtCursor': () => mockPosition,
    'Editor.getWordBefore2': () => mockWord,
  })

  const state = createDefaultState()
  const result = await handleEditorType(state)

  expect(result.x).toBe(mockPosition.x)
  expect(result.y).toBe(mockPosition.y)
  expect(result.leadingWord).toBe(mockWord)

  expect(mockRpc.invocations).toEqual([
    ['Editor.getPositionAtCursor', 0],
    ['Editor.getWordBefore2', 0, 5, 10],
  ])
})

test('handleEditorType - with filtered items', async () => {
  const mockPosition = {
    columnIndex: 10,
    rowIndex: 5,
    x: 100,
    y: 200,
  }
  const mockWord = 'test'
  const mockItems = [
    { flags: 0, kind: 1, label: 'test1', matches: [0, 1, 2, 3] },
    { flags: 0, kind: 1, label: 'test2', matches: [0, 1, 2, 3] },
    { flags: 0, kind: 1, label: 'other', matches: [0, 1, 2, 3] },
  ]

  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getPositionAtCursor': () => mockPosition,
    'Editor.getWordBefore2': () => mockWord,
  })

  const state = {
    ...createDefaultState(),
    unfilteredItems: mockItems,
  }
  const result = await handleEditorType(state)

  expect(result.items).toHaveLength(2)
  expect(result.items[0].label).toBe('test1')
  expect(result.items[1].label).toBe('test2')

  expect(mockRpc.invocations).toEqual([
    ['Editor.getPositionAtCursor', 0],
    ['Editor.getWordBefore2', 0, 5, 10],
  ])
})
