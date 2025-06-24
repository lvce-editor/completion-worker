import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { set } from '../src/parts/EditorWorker/EditorWorker.ts'
import { getLines } from '../src/parts/GetLines/GetLines.ts'

test('getLines - returns document lines', async () => {
  const mockLines = ['line 1', 'line 2', 'line 3']

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getLines2') {
        return mockLines
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(mockRpc)

  const result = await getLines(1)
  expect(result).toEqual(mockLines)
})

test('getLines - returns empty document', async () => {
  const mockLines: string[] = []

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getLines2') {
        return mockLines
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(mockRpc)

  const result = await getLines(1)
  expect(result).toEqual(mockLines)
})
