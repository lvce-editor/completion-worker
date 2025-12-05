import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import { handlePointerDown } from '../src/parts/HandlePointerDown/HandlePointerDown.js'

test('handlePointerDown - valid click on first item', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.applyEdit2': () => undefined,
    'Editor.closeWidget2': () => undefined,
    'Editor.getLines2': () => ['line1', 'line2', 'line3'],
    'Editor.getOffsetAtCursor': () => 5,
    'Editor.getSelections': () => [0, 5],
    'Editor.getSelections2': () => [0, 5],
    'ExtensionHost.activateByEvent': () => undefined,
    'ExtensionHost.invoke': () => undefined,
    'FileSystem.readDirWithFileTypes': () => [],
  })

  const state = {
    ...createDefaultState(),
    itemHeight: 20,
    items: [
      { flags: 0, kind: 1, label: 'item1', matches: [0, 1, 2, 3] },
      { flags: 0, kind: 1, label: 'item2', matches: [0, 1, 2, 3] },
      { flags: 0, kind: 1, label: 'item3', matches: [0, 1, 2, 3] },
    ],
    y: 100,
  }

  const result = await handlePointerDown(state, 50, 110)
  expect(result).toBeDefined()

  expect(mockRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 0],
    ['ActivateByEvent.activateByEvent', 'onCompletion:undefined'],
    ['Editor.getLines2', 0],
    ['Editor.getSelections2', 0],
    [
      'Editor.applyEdit2',
      0,
      [
        {
          deleted: [''],
          end: { columnIndex: 5, rowIndex: 0 },
          inserted: ['item1'],
          origin: '',
          start: { columnIndex: 5, rowIndex: 0 },
        },
      ],
    ],
    ['Editor.closeWidget2', 0, 3, 'Completions', 9],
  ])
})

test('handlePointerDown - valid click on second item', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.applyEdit2': () => undefined,
    'Editor.closeWidget2': () => undefined,
    'Editor.getLines2': () => ['line1', 'line2', 'line3'],
    'Editor.getOffsetAtCursor': () => 5,
    'Editor.getSelections': () => [0, 5],
    'Editor.getSelections2': () => [0, 5],
    'ExtensionHost.activateByEvent': () => undefined,
    'ExtensionHost.invoke': () => undefined,
    'FileSystem.readDirWithFileTypes': () => [],
  })

  const state = {
    ...createDefaultState(),
    itemHeight: 20,
    items: [
      { flags: 0, kind: 1, label: 'item1', matches: [0, 1, 2, 3] },
      { flags: 0, kind: 1, label: 'item2', matches: [0, 1, 2, 3] },
      { flags: 0, kind: 1, label: 'item3', matches: [0, 1, 2, 3] },
    ],
    y: 100,
  }

  const result = await handlePointerDown(state, 50, 130)
  expect(result).toBeDefined()

  expect(mockRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 0],
    ['ActivateByEvent.activateByEvent', 'onCompletion:undefined'],
    ['Editor.getLines2', 0],
    ['Editor.getSelections2', 0],
    [
      'Editor.applyEdit2',
      0,
      [
        {
          deleted: [''],
          end: { columnIndex: 5, rowIndex: 0 },
          inserted: ['item2'],
          origin: '',
          start: { columnIndex: 5, rowIndex: 0 },
        },
      ],
    ],
    ['Editor.closeWidget2', 0, 3, 'Completions', 9],
  ])
})

test('handlePointerDown - click before first item returns original state', async () => {
  const state = {
    ...createDefaultState(),
    itemHeight: 20,
    items: [
      { flags: 0, kind: 1, label: 'item1', matches: [0, 1, 2, 3] },
      { flags: 0, kind: 1, label: 'item2', matches: [0, 1, 2, 3] },
      { flags: 0, kind: 1, label: 'item3', matches: [0, 1, 2, 3] },
    ],
    y: 100,
  }

  const result = await handlePointerDown(state, 50, 90)
  expect(result).toBe(state)
})

test('handlePointerDown - click after last item returns original state', async () => {
  const state = {
    ...createDefaultState(),
    itemHeight: 20,
    items: [
      { flags: 0, kind: 1, label: 'item1', matches: [0, 1, 2, 3] },
      { flags: 0, kind: 1, label: 'item2', matches: [0, 1, 2, 3] },
      { flags: 0, kind: 1, label: 'item3', matches: [0, 1, 2, 3] },
    ],
    y: 100,
  }

  const result = await handlePointerDown(state, 50, 200)
  expect(result).toBe(state)
})

test('handlePointerDown - click on last valid item', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.applyEdit2': () => undefined,
    'Editor.closeWidget2': () => undefined,
    'Editor.getLines2': () => ['line1', 'line2', 'line3'],
    'Editor.getOffsetAtCursor': () => 5,
    'Editor.getSelections': () => [0, 5],
    'Editor.getSelections2': () => [0, 5],
    'ExtensionHost.activateByEvent': () => undefined,
    'ExtensionHost.invoke': () => undefined,
    'FileSystem.readDirWithFileTypes': () => [],
  })

  const state = {
    ...createDefaultState(),
    itemHeight: 20,
    items: [
      { flags: 0, kind: 1, label: 'item1', matches: [0, 1, 2, 3] },
      { flags: 0, kind: 1, label: 'item2', matches: [0, 1, 2, 3] },
      { flags: 0, kind: 1, label: 'item3', matches: [0, 1, 2, 3] },
    ],
    y: 100,
  }

  const result = await handlePointerDown(state, 50, 150)
  expect(result).toBeDefined()

  expect(mockRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 0],
    ['ActivateByEvent.activateByEvent', 'onCompletion:undefined'],
    ['Editor.getLines2', 0],
    ['Editor.getSelections2', 0],
    [
      'Editor.applyEdit2',
      0,
      [
        {
          deleted: [''],
          end: { columnIndex: 5, rowIndex: 0 },
          inserted: ['item3'],
          origin: '',
          start: { columnIndex: 5, rowIndex: 0 },
        },
      ],
    ],
    ['Editor.closeWidget2', 0, 3, 'Completions', 9],
  ])
})

test('handlePointerDown - empty items array', async () => {
  const state = {
    ...createDefaultState(),
    itemHeight: 20,
    items: [],
    y: 100,
  }

  const result = await handlePointerDown(state, 50, 110)
  expect(result).toBe(state)
})

test('handlePointerDown - single item click', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.applyEdit2': () => undefined,
    'Editor.closeWidget2': () => undefined,
    'Editor.getLines2': () => ['line1', 'line2', 'line3'],
    'Editor.getOffsetAtCursor': () => 5,
    'Editor.getSelections': () => [0, 5],
    'Editor.getSelections2': () => [0, 5],
    'ExtensionHost.activateByEvent': () => undefined,
    'ExtensionHost.invoke': () => undefined,
    'FileSystem.readDirWithFileTypes': () => [],
  })

  const state = {
    ...createDefaultState(),
    itemHeight: 20,
    items: [{ flags: 0, kind: 1, label: 'singleItem', matches: [0, 1, 2, 3] }],
    y: 100,
  }

  const result = await handlePointerDown(state, 50, 110)
  expect(result).toBeDefined()

  expect(mockRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 0],
    ['ActivateByEvent.activateByEvent', 'onCompletion:undefined'],
    ['Editor.getLines2', 0],
    ['Editor.getSelections2', 0],
    [
      'Editor.applyEdit2',
      0,
      [
        {
          deleted: [''],
          end: { columnIndex: 5, rowIndex: 0 },
          inserted: ['singleItem'],
          origin: '',
          start: { columnIndex: 5, rowIndex: 0 },
        },
      ],
    ],
    ['Editor.closeWidget2', 0, 3, 'Completions', 9],
  ])
})
