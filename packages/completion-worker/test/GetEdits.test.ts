import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { RpcId } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { getEdits } from '../src/parts/GetEdits/GetEdits.ts'

const createCompletionItem = (label: string): CompletionItem => ({
  label,
  kind: 1,
  flags: 0,
  matches: [],
})

test('getEdits - returns changes for simple completion', async () => {
  const mockLines = ['const hel']
  const mockSelections = [0, 5]
  const mockCompletion = createCompletionItem('hello')

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getLines2') {
        return mockLines
      }
      if (method === 'Editor.getSelections2') {
        return mockSelections
      }
      if (method === 'Editor.getOffsetAtCursor') {
        return 10
      }
      if (method === 'ExtensionHostEditor.execute') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.EditorWorker, mockRpc)
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockRpc)

  const result = await getEdits(1, 'hel', mockCompletion)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    start: { rowIndex: 0, columnIndex: 2 },
    end: { rowIndex: 0, columnIndex: 5 },
    inserted: ['hello'],
    deleted: ['nst'],
    origin: '',
  })
})

test.skip('getEdits - returns changes with resolved snippet', async () => {
  const mockLines = ['const hel']
  const mockSelections = [0, 5]
  const mockCompletion = createCompletionItem('hello')
  const mockResolvedItem = {
    snippet: 'hello()',
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getLines2') {
        return mockLines
      }
      if (method === 'Editor.getSelections2') {
        return mockSelections
      }
      if (method === 'Editor.getOffsetAtCursor') {
        return 10
      }
      if (method === 'ExtensionHostEditor.execute') {
        return [mockResolvedItem]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.EditorWorker, mockRpc)
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockRpc)

  const result = await getEdits(1, 'hel', mockCompletion)
  expect(result).toHaveLength(1)
  expect(result[0]).toMatchObject({
    inserted: ['hello()'],
  })
})

test('getEdits - returns changes when resolved item is undefined', async () => {
  const mockLines = ['const hel']
  const mockSelections = [0, 5]
  const mockCompletion = createCompletionItem('hello')

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getLines2') {
        return mockLines
      }
      if (method === 'Editor.getSelections2') {
        return mockSelections
      }
      if (method === 'Editor.getOffsetAtCursor') {
        return 10
      }
      if (method === 'ExtensionHostEditor.execute') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RpcId.EditorWorker, mockRpc)
  RpcRegistry.set(RpcId.ExtensionHostWorker, mockRpc)

  const result = await getEdits(1, 'hel', mockCompletion)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    start: { rowIndex: 0, columnIndex: 2 },
    end: { rowIndex: 0, columnIndex: 5 },
    inserted: ['hello'],
    deleted: ['nst'],
    origin: '',
  })
})
