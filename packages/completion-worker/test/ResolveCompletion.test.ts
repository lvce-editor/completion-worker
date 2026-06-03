import { expect, test } from '@jest/globals'
import { EditorWorker, ExtensionHost, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import { resolveCompletion } from '../src/parts/ResolveCompletion/ResolveCompletion.ts'

const createCompletionItem = (label: string): CompletionItem => ({
  flags: 0,
  kind: 1,
  label,
  matches: [],
})

const textDocument = {
  documentId: 1,
  languageId: 'typescript',
  text: 'const test = 1',
  uri: 'file:///test.ts',
}

test('resolveCompletion returns resolved completion item', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getOffsetAtCursor': () => 10,
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostCompletion.executeResolve': () => {
      throw new Error('should not use extension host worker')
    },
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeResolveCompletionItemProvider': () => ({ resolved: true }),
  })

  const result = await resolveCompletion(1, 'test', createCompletionItem('test'))
  expect(result).toEqual({ resolved: true })

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['Editor.getLanguageId', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([
    ['Extensions.executeResolveCompletionItemProvider', textDocument, 10, 'test', createCompletionItem('test')],
  ])
  expect(mockExtensionHostRpc.invocations).toEqual([])
})

test('resolveCompletion returns undefined when extension management worker fails', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLanguageId': () => 'typescript',
    'Editor.getLines2': () => ['const test = 1'],
    'Editor.getOffsetAtCursor': () => 10,
    'Editor.getUri': () => 'file:///test.ts',
  })
  const mockExtensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostEditor.execute': () => {
      throw new Error('should not use extension host worker')
    },
  })
  const mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeResolveCompletionItemProvider': () => {
      throw new Error('extension management worker error')
    },
  })

  const result = await resolveCompletion(1, 'test', createCompletionItem('test'))
  expect(result).toBeUndefined()

  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 1],
    ['Editor.getLanguageId', 1],
    ['Editor.getLines2', 1],
    ['Editor.getUri', 1],
  ])
  expect(mockExtensionManagementRpc.invocations).toEqual([
    ['Extensions.executeResolveCompletionItemProvider', textDocument, 10, 'test', createCompletionItem('test')],
  ])
  expect(mockExtensionHostRpc.invocations).toEqual([])
})

test('resolveCompletion returns undefined when getOffsetAtCursor fails', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getOffsetAtCursor': () => {
      throw new Error('getOffsetAtCursor error')
    },
  })

  const result = await resolveCompletion(1, 'test', createCompletionItem('test'))
  expect(result).toBeUndefined()

  expect(mockEditorRpc.invocations).toEqual([['Editor.getOffsetAtCursor', 1]])
})

test('resolveCompletion returns undefined when name is not a string', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({})

  const result = await resolveCompletion(1, 123 as any, createCompletionItem('test'))
  expect(result).toBeUndefined()

  expect(mockEditorRpc.invocations).toEqual([])
})

test('resolveCompletion returns undefined when completionItem is not an object', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({})

  const result = await resolveCompletion(1, 'test', 'not an object' as any)
  expect(result).toBeUndefined()

  expect(mockEditorRpc.invocations).toEqual([])
})
