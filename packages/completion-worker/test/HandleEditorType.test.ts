import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import { handleEditorType } from '../src/parts/HandleEditorType/HandleEditorType.js'

test('handleEditorType - basic functionality', async () => {
  const mockPosition = {
    columnIndex: 10,
    editorWidth: 180,
    editorX: 80,
    rowIndex: 5,
    x: 100,
    y: 200,
  }
  const mockWord = 'test'

  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getCompletionContext': () => ({ ...mockPosition, wordBefore: mockWord }),
    'FileSystem.readDirWithFileTypes': () => [],
  })

  const state = createDefaultState('test-application')
  const result = await handleEditorType(state)

  expect(result).toBeDefined()
  expect(result.items).toBeDefined()
  expect(result.x).toBe(80)
  expect(result.width).toBe(180)
  expect(result.y).toBeDefined()
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBeLessThanOrEqual(8)
  expect(result.leadingWord).toBeDefined()
  expect(result.height).toBeDefined()
  expect(result.finalDeltaY).toBeDefined()

  expect(mockRpc.invocations).toEqual([
    ['Editor.getCompletionContext', 0, false],
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

  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getCompletionContext': () => ({ ...mockPosition, wordBefore: mockWord }),
  })

  const state = createDefaultState('test-application')
  const result = await handleEditorType(state)

  expect(result.x).toBe(mockPosition.x)
  expect(result.y).toBe(mockPosition.y)
  expect(result.leadingWord).toBe(mockWord)

  expect(mockRpc.invocations).toEqual([
    ['Editor.getCompletionContext', 0, false],
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
    { flags: 0, kind: 1, label: 'test-completion-label-long', matches: [0, 1, 2, 3] },
    { flags: 0, kind: 1, label: 'other', matches: [0, 1, 2, 3] },
    { flags: 0, kind: 1, label: 'other-completion-label-that-is-even-longer', matches: [0, 1, 2, 3] },
  ]

  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getCompletionContext': () => ({ ...mockPosition, wordBefore: mockWord }),
  })

  const state = {
    ...createDefaultState('test-application'),
    unfilteredItems: mockItems,
  }
  const result = await handleEditorType(state)

  expect(result.items).toHaveLength(3)
  expect(result.items[0].label).toBe('test1')
  expect(result.items[1].label).toBe('test2')
  expect(result.width).toBe(341)

  expect(mockRpc.invocations).toEqual([
    ['Editor.getCompletionContext', 0, false],
  ])
})

test('handleEditorType preserves dotted JSON completion prefixes from the current line', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getCompletionContext': () => ({
      columnIndex: 18,
      editorWidth: 180,
      editorX: 80,
      line: '  simpleBrowser.wo',
      rowIndex: 0,
      x: 100,
      y: 200,
    }),
  })
  const state = { ...createDefaultState('test-application'), editorLanguageId: 'json' }
  const result = await handleEditorType(state)

  expect(result.leadingWord).toBe('simpleBrowser.wo')
  expect(mockRpc.invocations).toEqual([['Editor.getCompletionContext', 0, true]])
})
