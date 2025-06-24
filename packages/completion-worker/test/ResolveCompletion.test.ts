import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { resolveCompletion } from '../src/parts/ResolveCompletion/ResolveCompletion.ts'

const createCompletionItem = (label: string): CompletionItem => ({
  label,
  kind: 1,
  flags: 0,
  matches: [],
})

test('resolveCompletion returns resolved completion item', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getOffsetAtCursor') {
        return 10
      }
      if (method === 'ExtensionHostCompletion.executeResolve') {
        return { resolved: true }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)
  ExtensionHostWorker.set(mockRpc)

  const result = await resolveCompletion(1, 'test', createCompletionItem('test'))
  expect(result).toEqual({ resolved: true })
})

test('resolveCompletion returns undefined when extension host fails', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getOffsetAtCursor') {
        return 10
      }
      if (method === 'ExtensionHostEditor.execute') {
        throw new Error('extension host error')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)
  ExtensionHostWorker.set(mockRpc)

  const result = await resolveCompletion(1, 'test', createCompletionItem('test'))
  expect(result).toBeUndefined()
})

test('resolveCompletion returns undefined when getOffsetAtCursor fails', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.getOffsetAtCursor') {
        throw new Error('getOffsetAtCursor error')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const result = await resolveCompletion(1, 'test', createCompletionItem('test'))
  expect(result).toBeUndefined()
})

test('resolveCompletion returns undefined when name is not a string', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const result = await resolveCompletion(1, 123 as any, createCompletionItem('test'))
  expect(result).toBeUndefined()
})

test('resolveCompletion returns undefined when completionItem is not an object', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockRpc)

  const result = await resolveCompletion(1, 'test', 'not an object' as any)
  expect(result).toBeUndefined()
})
