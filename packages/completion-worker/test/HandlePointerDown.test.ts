import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.js'
import { handlePointerDown } from '../src/parts/HandlePointerDown/HandlePointerDown.js'

test('handlePointerDown - valid click on first item', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      if (method === 'Editor.getLines2') {
        return ['line1', 'line2', 'line3']
      }
      if (method === 'Editor.getSelections') {
        return [0, 5]
      }
      if (method === 'Editor.getOffsetAtCursor') {
        return 5
      }
      if (method === 'ExtensionHost.activateByEvent') {
        return undefined
      }
      if (method === 'ExtensionHost.invoke') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const state = {
    ...createDefaultState(),
    y: 100,
    itemHeight: 20,
    items: [
      { label: 'item1', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
      { label: 'item2', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
      { label: 'item3', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
    ],
  }

  const result = await handlePointerDown(state, 50, 110)
  expect(result).toBeDefined()
})

test('handlePointerDown - valid click on second item', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      if (method === 'Editor.getLines2') {
        return ['line1', 'line2', 'line3']
      }
      if (method === 'Editor.getSelections') {
        return [0, 5]
      }
      if (method === 'Editor.getOffsetAtCursor') {
        return 5
      }
      if (method === 'ExtensionHost.activateByEvent') {
        return undefined
      }
      if (method === 'ExtensionHost.invoke') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const state = {
    ...createDefaultState(),
    y: 100,
    itemHeight: 20,
    items: [
      { label: 'item1', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
      { label: 'item2', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
      { label: 'item3', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
    ],
  }

  const result = await handlePointerDown(state, 50, 130)
  expect(result).toBeDefined()
})

test('handlePointerDown - click before first item returns original state', async () => {
  const state = {
    ...createDefaultState(),
    y: 100,
    itemHeight: 20,
    items: [
      { label: 'item1', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
      { label: 'item2', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
      { label: 'item3', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
    ],
  }

  const result = await handlePointerDown(state, 50, 90)
  expect(result).toBe(state)
})

test('handlePointerDown - click after last item returns original state', async () => {
  const state = {
    ...createDefaultState(),
    y: 100,
    itemHeight: 20,
    items: [
      { label: 'item1', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
      { label: 'item2', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
      { label: 'item3', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
    ],
  }

  const result = await handlePointerDown(state, 50, 200)
  expect(result).toBe(state)
})

test('handlePointerDown - click on last valid item', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      if (method === 'Editor.getLines2') {
        return ['line1', 'line2', 'line3']
      }
      if (method === 'Editor.getSelections') {
        return [0, 5]
      }
      if (method === 'Editor.getOffsetAtCursor') {
        return 5
      }
      if (method === 'ExtensionHost.activateByEvent') {
        return undefined
      }
      if (method === 'ExtensionHost.invoke') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const state = {
    ...createDefaultState(),
    y: 100,
    itemHeight: 20,
    items: [
      { label: 'item1', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
      { label: 'item2', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
      { label: 'item3', kind: 1, flags: 0, matches: [0, 1, 2, 3] },
    ],
  }

  const result = await handlePointerDown(state, 50, 150)
  expect(result).toBeDefined()
})

test('handlePointerDown - empty items array', async () => {
  const state = {
    ...createDefaultState(),
    y: 100,
    itemHeight: 20,
    items: [],
  }

  const result = await handlePointerDown(state, 50, 110)
  expect(result).toBe(state)
})

test('handlePointerDown - single item click', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      if (method === 'Editor.getLines2') {
        return ['line1', 'line2', 'line3']
      }
      if (method === 'Editor.getSelections') {
        return [0, 5]
      }
      if (method === 'Editor.getOffsetAtCursor') {
        return 5
      }
      if (method === 'ExtensionHost.activateByEvent') {
        return undefined
      }
      if (method === 'ExtensionHost.invoke') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const state = {
    ...createDefaultState(),
    y: 100,
    itemHeight: 20,
    items: [{ label: 'singleItem', kind: 1, flags: 0, matches: [0, 1, 2, 3] }],
  }

  const result = await handlePointerDown(state, 50, 110)
  expect(result).toBeDefined()
})
