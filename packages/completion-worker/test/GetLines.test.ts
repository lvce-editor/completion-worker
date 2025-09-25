import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { getLines } from '../src/parts/GetLines/GetLines.ts'

test('getLines - returns document lines', async () => {
  const mockLines = ['line 1', 'line 2', 'line 3']

  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => mockLines,
  })

  const result = await getLines(1)
  expect(result).toEqual(mockLines)
  expect(mockRpc.invocations).toEqual([
    ['Editor.getLines2', 1]
  ])
})

test('getLines - returns empty document', async () => {
  const mockLines: string[] = []

  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => mockLines,
  })

  const result = await getLines(1)
  expect(result).toEqual(mockLines)
  expect(mockRpc.invocations).toEqual([
    ['Editor.getLines2', 1]
  ])
})
