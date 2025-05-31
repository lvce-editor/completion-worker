import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { RpcId } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test.skip('loadContent', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return Promise.resolve({
          rowIndex: 1,
          columnIndex: 2,
          x: 100,
          y: 200,
        })
      }
      if (method === 'Editor.getWordAtOffset' || method === 'Editor.getWordAtOffset2') {
        return Promise.resolve('test')
      }
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([
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
        ])
      }
      if (method === 'ActivateByEvent.activateByEvent') {
        return Promise.resolve(undefined)
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([
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
        ])
      }
      return Promise.resolve(undefined)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([
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
        ])
      }
      return Promise.resolve(undefined)
    },
  })
  RpcRegistry.set(RpcId.EditorWorker, mockEditorRpc)
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockExtensionHostRpc)

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

test.skip('loadContent with completions', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return Promise.resolve({
          rowIndex: 1,
          columnIndex: 2,
          x: 100,
          y: 200,
        })
      }
      if (method === 'Editor.getWordAtOffset' || method === 'Editor.getWordAtOffset2') {
        return Promise.resolve('test')
      }
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([
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
        ])
      }
      if (method === 'ActivateByEvent.activateByEvent') {
        return Promise.resolve(undefined)
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([
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
        ])
      }
      return Promise.resolve(undefined)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([
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
        ])
      }
      return Promise.resolve(undefined)
    },
  })
  RpcRegistry.set(RpcId.EditorWorker, mockEditorRpc)
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockExtensionHostRpc)

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

test.skip('loadContent with no completions', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        return Promise.resolve({
          rowIndex: 1,
          columnIndex: 2,
          x: 100,
          y: 200,
        })
      }
      if (method === 'Editor.getWordAtOffset' || method === 'Editor.getWordAtOffset2') {
        return Promise.resolve('test')
      }
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([])
      }
      if (method === 'ActivateByEvent.activateByEvent') {
        return Promise.resolve(undefined)
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([])
      }
      return Promise.resolve(undefined)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([])
      }
      return Promise.resolve(undefined)
    },
  })
  RpcRegistry.set(RpcId.EditorWorker, mockEditorRpc)
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockExtensionHostRpc)

  const state = createDefaultState()
  const newState = await loadContent(state)

  expect(newState.items).toHaveLength(0)
  expect(newState.unfilteredItems).toHaveLength(0)
  expect(newState.leadingWord).toBe('test')
  expect(newState.focusedIndex).toBe(-1)
  expect(newState.maxLineY).toBe(0)
})

test.skip('loadContent with error in getPositionAtCursor', async () => {
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        throw new Error('Failed to get position')
      }
      if (method === 'Editor.getWordAtOffset' || method === 'Editor.getWordAtOffset2') {
        return Promise.resolve('test')
      }
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([])
      }
      if (method === 'ActivateByEvent.activateByEvent') {
        return Promise.resolve(undefined)
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  const mockExtensionHostRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([])
      }
      return Promise.resolve(undefined)
    },
    invokeAndTransfer: (method: string) => {
      if (method === 'ExtensionHostCompletion.executeCompletionProvider') {
        return Promise.resolve([])
      }
      return Promise.resolve(undefined)
    },
  })
  RpcRegistry.set(RpcId.EditorWorker, mockEditorRpc)
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockExtensionHostRpc)

  const state = createDefaultState()
  await expect(loadContent(state)).rejects.toThrow('Failed to get position')
})
