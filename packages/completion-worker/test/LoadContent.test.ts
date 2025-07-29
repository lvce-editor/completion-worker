import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return {
          rowIndex: 1,
          columnIndex: 2,
          x: 100,
          y: 200,
        }
      }
      if (method === 'Editor.getWordAtOffset' || method === 'Editor.getWordAtOffset2') {
        return 'test'
      }
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.execute') {
        return [
          {
            label: 'test1',
            kind: 1,
            flags: 0,
            matches: [0, 4],
          },
          {
            label: 'test2',
            kind: 1,
            flags: 0,
            matches: [0, 4],
          },
        ]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const state: CompletionState = createDefaultState()
  const newState = await loadContent(state)

  expect(newState.items).toHaveLength(2)
  expect(newState.unfilteredItems).toHaveLength(2)
  expect(newState.leadingWord).toBe('test')
  expect(newState.x).toBe(100)
  expect(newState.y).toBe(200)
  expect(newState.focusedIndex).toBe(0)
  expect(newState.maxLineY).toBe(2)
  expect(newState.version).toBe(1)
  expect(newState.width).toBe(200)
})

test('loadContent with completions', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return {
          rowIndex: 1,
          columnIndex: 2,
          x: 100,
          y: 200,
        }
      }
      if (method === 'Editor.getWordAtOffset' || method === 'Editor.getWordAtOffset2') {
        return 'test'
      }
      if (method === 'ExtensionHostCompletion.execute') {
        return [
          {
            label: 'test1',
            kind: 1,
            flags: 0,
            matches: [0, 4],
          },
          {
            label: 'test2',
            kind: 1,
            flags: 0,
            matches: [0, 4],
          },
        ]
      }
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.execute') {
        return [
          {
            label: 'test1',
            kind: 1,
            flags: 0,
            matches: [0, 4],
          },
          {
            label: 'test2',
            kind: 1,
            flags: 0,
            matches: [0, 4],
          },
        ]
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'ExtensionHostCompletion.execute') {
        return [
          {
            label: 'test1',
            kind: 1,
            flags: 0,
            matches: [0, 4],
          },
          {
            label: 'test2',
            kind: 1,
            flags: 0,
            matches: [0, 4],
          },
        ]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const state = createDefaultState()
  const newState = await loadContent(state)

  expect(newState.items).toHaveLength(2)
  expect(newState.unfilteredItems).toHaveLength(2)
  expect(newState.leadingWord).toBe('test')
  expect(newState.x).toBe(100)
  expect(newState.y).toBe(200)
  expect(newState.focusedIndex).toBe(0)
  expect(newState.maxLineY).toBe(2)
  expect(newState.version).toBe(1)
  expect(newState.width).toBe(200)
})

test('loadContent with no completions', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return {
          rowIndex: 1,
          columnIndex: 2,
          x: 100,
          y: 200,
        }
      }
      if (method === 'Editor.getWordAtOffset' || method === 'Editor.getWordAtOffset2') {
        return 'test'
      }
      if (method === 'ExtensionHostCompletion.execute') {
        return []
      }
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.execute') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'ExtensionHostCompletion.execute') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)

  const state = createDefaultState()
  const newState = await loadContent(state)

  expect(newState.items).toHaveLength(0)
  expect(newState.unfilteredItems).toHaveLength(0)
  expect(newState.leadingWord).toBe('test')
  expect(newState.focusedIndex).toBe(-1)
  expect(newState.maxLineY).toBe(0)
})

test('loadContent with error in getPositionAtCursor', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        throw new Error('Failed to get position')
      }
      if (method === 'Editor.getWordAtOffset' || method === 'Editor.getWordAtOffset2') {
        return 'test'
      }
      if (method === 'ExtensionHostCompletion.execute') {
        return []
      }
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.execute') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'ExtensionHostCompletion.execute') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
  ExtensionHostWorker.set(mockExtensionHostRpc)
  const state = createDefaultState()
  await expect(loadContent(state)).rejects.toThrow('Failed to get position')
})
