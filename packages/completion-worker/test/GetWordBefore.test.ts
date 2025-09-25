import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { getWordBefore } from '../src/parts/GetWordBefore/GetWordBefore.ts'

test('getWordBefore - returns word before cursor', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getWordBefore2': () => 'hello',
  })

  const result = await getWordBefore(1, 0, 5)
  expect(result).toBe('hello')
  expect(mockRpc.invocations).toEqual([['Editor.getWordBefore2', 1, 0, 5]])
})

test('getWordBefore - returns empty string when no word before', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getWordBefore2': () => '',
  })

  const result = await getWordBefore(1, 0, 0)
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['Editor.getWordBefore2', 1, 0, 0]])
})
