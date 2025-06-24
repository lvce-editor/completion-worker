import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { set } from '../src/parts/EditorWorker/EditorWorker.ts'
import { getWordAtOffset } from '../src/parts/GetWordAtOffset/GetWordAtOffset.ts'

test('getWordAtOffset - returns word at cursor', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getWordAtOffset2') {
        return 'hello'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(mockRpc)

  const result = await getWordAtOffset(1)
  expect(result).toBe('hello')
})

test('getWordAtOffset - returns empty string when no word at cursor', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getWordAtOffset2') {
        return ''
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(mockRpc)

  const result = await getWordAtOffset(1)
  expect(result).toBe('')
})
