import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { RpcId } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleEditorDeleteLeft } from '../src/parts/HandleEditorDeleteLeft/HandleEditorDeleteLeft.ts'

test('handleEditorDeleteLeft with word at offset', async () => {
  const mockRpc = MockRpc.create({
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
      if (method === 'Editor.getWordAtOffset2') {
        return Promise.resolve('test')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.EditorWorker, mockRpc)

  const state = createDefaultState()
  const newState = await handleEditorDeleteLeft(state)

  expect(newState.x).toBe(100)
  expect(newState.y).toBe(200)
  expect(newState.leadingWord).toBe('test')
  expect(newState.disposed).toBeUndefined()
})

test('handleEditorDeleteLeft with no word at offset', async () => {
  const mockRpc = MockRpc.create({
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
      if (method === 'Editor.getWordAtOffset2') {
        return Promise.resolve('')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.EditorWorker, mockRpc)

  const state = createDefaultState()
  const newState = await handleEditorDeleteLeft(state)

  expect(newState.disposed).toBe(true)
})

test('handleEditorDeleteLeft with error in getPositionAtCursor', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getPositionAtCursor') {
        throw new Error('Failed to get position')
      }
      if (method === 'Editor.getWordAtOffset') {
        return Promise.resolve('test')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.EditorWorker, mockRpc)

  const state = createDefaultState()
  await expect(handleEditorDeleteLeft(state)).rejects.toThrow('Failed to get position')
})
