import { expect, test } from '@jest/globals'
import { getEdits } from '../src/parts/GetEdits/GetEdits.ts'
import { MockRpc } from '@lvce-editor/rpc'
import { set } from '../src/parts/EditorWorker/EditorWorker.ts'

test('getEdits - returns changes for simple completion', async () => {
  const mockLines = ['const hel']
  const mockSelections = [0, 5]
  const mockCompletion = {
    label: 'hello',
    kind: 1,
    flags: 0,
    matches: [0, 1, 2, 3],
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getLines2') {
        return Promise.resolve(mockLines)
      }
      if (method === 'Editor.getSelections') {
        return Promise.resolve(mockSelections)
      }
      if (method === 'Completions.resolveCompletion') {
        return Promise.resolve(null)
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(mockRpc)

  const result = await getEdits(1, 'hel', mockCompletion)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    start: { rowIndex: 0, columnIndex: 0 },
    end: { rowIndex: 0, columnIndex: 3 },
    inserted: ['hello'],
    deleted: ['hel'],
    origin: '',
  })
})

test('getEdits - returns changes with resolved snippet', async () => {
  const mockLines = ['const hel']
  const mockSelections = [0, 5]
  const mockCompletion = {
    label: 'hello',
    kind: 1,
    flags: 0,
    matches: [0, 1, 2, 3],
  }
  const mockResolvedItem = {
    snippet: 'hello()',
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getLines2') {
        return Promise.resolve(mockLines)
      }
      if (method === 'Editor.getSelections2') {
        return Promise.resolve(mockSelections)
      }
      if (method === 'Completions.resolveCompletion') {
        return Promise.resolve(mockResolvedItem)
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(mockRpc)

  const result = await getEdits(1, 'hel', mockCompletion)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    start: { rowIndex: 0, columnIndex: 2 },
    end: { rowIndex: 0, columnIndex: 3 },
    inserted: ['hello'],
    deleted: ['hel'],
    origin: '',
  })
})
