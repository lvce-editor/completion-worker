import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { resolveCompletion } from '../src/parts/ResolveCompletion/ResolveCompletion.ts'

const createCompletionItem = (label: string): CompletionItem => ({
  label,
  kind: 1,
  flags: 0,
  matches: [],
})

test.skip('resolveCompletion returns resolved completion item', async () => {
  // @ts-ignore
  const _mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getOffsetAtCursor': () => 10,
  })
  const _mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.executeResolve': () => ({ resolved: true }),
  })

  const result = await resolveCompletion(1, 'test', createCompletionItem('test'))
  expect(result).toEqual({ resolved: true })

  expect(_mockEditorRpc.invocations).toEqual([['Editor.getOffsetAtCursor', 1]])
  expect(_mockExtensionHostRpc.invocations).toEqual([['ExtensionHostCompletion.executeResolve', 1, 10, 'test', createCompletionItem('test')]])
})

test('resolveCompletion returns undefined when extension host fails', async () => {
  // @ts-ignore
  const _mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getOffsetAtCursor': () => 10,
  })
  const _mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostEditor.execute': () => {
      throw new Error('extension host error')
    },
  })

  const result = await resolveCompletion(1, 'test', createCompletionItem('test'))
  expect(result).toBeUndefined()

  expect(_mockEditorRpc.invocations).toEqual([['Editor.getOffsetAtCursor', 1]])
  expect(_mockExtensionHostRpc.invocations).toEqual([['ExtensionHostEditor.execute', 1, 'test', createCompletionItem('test')]])
})

test('resolveCompletion returns undefined when getOffsetAtCursor fails', async () => {
  // @ts-ignore
  const _mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getOffsetAtCursor': () => {
      throw new Error('getOffsetAtCursor error')
    },
  })

  const result = await resolveCompletion(1, 'test', createCompletionItem('test'))
  expect(result).toBeUndefined()

  expect(_mockEditorRpc.invocations).toEqual([['Editor.getOffsetAtCursor', 1]])
})

test('resolveCompletion returns undefined when name is not a string', async () => {
  // @ts-ignore
  const _mockEditorRpc = EditorWorker.registerMockRpc({})

  const result = await resolveCompletion(1, 123 as any, createCompletionItem('test'))
  expect(result).toBeUndefined()
})

test('resolveCompletion returns undefined when completionItem is not an object', async () => {
  // @ts-ignore
  const _mockEditorRpc = EditorWorker.registerMockRpc({})

  const result = await resolveCompletion(1, 'test', 'not an object' as any)
  expect(result).toBeUndefined()
})
