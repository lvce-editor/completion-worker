import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { getWordAtOffset } from '../src/parts/GetWordAtOffset/GetWordAtOffset.ts'

test('getWordAtOffset - returns word at cursor', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getWordAtOffset2': () => 'hello',
  })

  const result = await getWordAtOffset(1)
  expect(result).toBe('hello')
})

test('getWordAtOffset - returns empty string when no word at cursor', async () => {
  const mockRpc = EditorWorker.registerMockRpc({
    'Editor.getWordAtOffset2': () => '',
  })

  const result = await getWordAtOffset(1)
  expect(result).toBe('')
})
