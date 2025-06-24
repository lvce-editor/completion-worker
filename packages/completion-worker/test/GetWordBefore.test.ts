import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { set } from '../src/parts/EditorWorker/EditorWorker.ts'
import { getWordBefore } from '../src/parts/GetWordBefore/GetWordBefore.ts'

test('getWordBefore - returns word before cursor', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getWordBefore2') {
        return 'hello'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(mockRpc)

  const result = await getWordBefore(1, 0, 5)
  expect(result).toBe('hello')
})

test('getWordBefore - returns empty string when no word before', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getWordBefore2') {
        return ''
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(mockRpc)

  const result = await getWordBefore(1, 0, 0)
  expect(result).toBe('')
})
