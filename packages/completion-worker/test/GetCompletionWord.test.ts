import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { getCompletionWord } from '../src/parts/GetCompletionWord/GetCompletionWord.ts'

test('getCompletionWord includes dots in JSON property prefixes', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => ['  simpleBrowser.wo'],
  })

  const result = await getCompletionWord(1, 'json', 0, 18)

  expect(result).toBe('simpleBrowser.wo')
  expect(mockRpc.invocations).toEqual([['Editor.getLines2', 1]])
})

test('getCompletionWord includes dots in quoted JSON property prefixes', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => ['  "simpleBrowser."'],
  })

  const result = await getCompletionWord(1, 'json', 0, 17)

  expect(result).toBe('simpleBrowser.')
  expect(mockRpc.invocations).toEqual([['Editor.getLines2', 1]])
})

test('getCompletionWord returns an empty JSON prefix when the line is empty', async () => {
  using mockRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => [''],
  })

  const result = await getCompletionWord(1, 'jsonc', 0, 0)

  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['Editor.getLines2', 1]])
})

test('getCompletionWord preserves the editor word for non-JSON languages', async () => {
  const word = 'simpleBrowser'
  const result = await getCompletionWord(1, 'typescript', 0, 18, async () => word)

  expect(result).toBe(word)
})
