import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getOffsetAtCursor': () => 0,
    'Editor.getPositionAtCursor': () => ({
      rowIndex: 1,
      columnIndex: 2,
      x: 100,
      y: 200,
    }),
    'Editor.getWordAtOffset': () => 'test',
    'Editor.getWordAtOffset2': () => 'test',
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHostCompletion.execute': () => [
      {
        label: 'test1',
        kind: 1,
        flags: 0,
        matches: [0, 4],
      },
      {
        label: 'test2',
        kind: 1,
        flags: 0,
        matches: [0, 4],
      },
    ],
  })
  EditorWorker.set(mockEditorRpc)

  const state: CompletionState = createDefaultState()
  const newState = await loadContent(state)

  expect(newState.items).toHaveLength(2)
  expect(newState.unfilteredItems).toHaveLength(2)
  expect(newState.leadingWord).toBe('test')
  expect(newState.x).toBe(100)
  expect(newState.y).toBe(200)
  expect(newState.focusedIndex).toBe(0)
  expect(newState.maxLineY).toBe(2)
  expect(newState.version).toBe(1)
  expect(newState.width).toBe(200)
  
  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 0],
    ['ActivateByEvent.activateByEvent', 'onCompletion:'],
    ['Editor.getWordAtOffset2', 0],
    ['Editor.getPositionAtCursor', 0]
  ])
  expect(mockExtensionHostRpc.invocations).toEqual([
    ['ExtensionHostCompletion.execute', 0, 0]
  ])
})

test('loadContent with completions', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getPositionAtCursor': () => ({
      rowIndex: 1,
      columnIndex: 2,
      x: 100,
      y: 200,
    }),
    'Editor.getWordAtOffset': () => 'test',
    'Editor.getWordAtOffset2': () => 'test',
    'ActivateByEvent.activateByEvent': () => undefined,
    'Editor.getOffsetAtCursor': () => 0,
  })
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHostCompletion.execute': () => [
      {
        label: 'test1',
        kind: 1,
        flags: 0,
        matches: [0, 4],
      },
      {
        label: 'test2',
        kind: 1,
        flags: 0,
        matches: [0, 4],
      },
    ],
  })
  EditorWorker.set(mockEditorRpc)

  const state = createDefaultState()
  const newState = await loadContent(state)

  expect(newState.items).toHaveLength(2)
  expect(newState.unfilteredItems).toHaveLength(2)
  expect(newState.leadingWord).toBe('test')
  expect(newState.x).toBe(100)
  expect(newState.y).toBe(200)
  expect(newState.focusedIndex).toBe(0)
  expect(newState.maxLineY).toBe(2)
  expect(newState.version).toBe(1)
  expect(newState.width).toBe(200)
  
  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 0],
    ['ActivateByEvent.activateByEvent', 'onCompletion:'],
    ['Editor.getWordAtOffset2', 0],
    ['Editor.getPositionAtCursor', 0]
  ])
  expect(mockExtensionHostRpc.invocations).toEqual([
    ['ExtensionHostCompletion.execute', 0, 0]
  ])
})

test('loadContent with no completions', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getPositionAtCursor': () => ({
      rowIndex: 1,
      columnIndex: 2,
      x: 100,
      y: 200,
    }),
    'Editor.getWordAtOffset': () => 'test',
    'Editor.getWordAtOffset2': () => 'test',
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHostCompletion.execute': () => [],
  })
  EditorWorker.set(mockEditorRpc)

  const state = createDefaultState()
  const newState = await loadContent(state)

  expect(newState.items).toHaveLength(0)
  expect(newState.unfilteredItems).toHaveLength(0)
  expect(newState.leadingWord).toBe('test')
  expect(newState.focusedIndex).toBe(-1)
  expect(newState.maxLineY).toBe(0)
  
  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 0],
    ['Editor.getWordAtOffset2', 0],
    ['Editor.getPositionAtCursor', 0]
  ])
  expect(mockExtensionHostRpc.invocations).toEqual([
    ['ExtensionHostCompletion.execute', 0, 0]
  ])
})

test('loadContent with error in getPositionAtCursor', async () => {
  const mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getPositionAtCursor': () => {
      throw new Error('Failed to get position')
    },
    'Editor.getWordAtOffset': () => 'test',
    'Editor.getWordAtOffset2': () => 'test',
    'ActivateByEvent.activateByEvent': () => undefined,
  })
  const mockExtensionHostRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHostCompletion.execute': () => [],
  })
  EditorWorker.set(mockEditorRpc)
  const state = createDefaultState()
  await expect(loadContent(state)).rejects.toThrow('Failed to get position')
  
  expect(mockEditorRpc.invocations).toEqual([
    ['Editor.getOffsetAtCursor', 0],
    ['Editor.getWordAtOffset2', 0],
    ['Editor.getPositionAtCursor', 0]
  ])
})
