import { expect, test } from '@jest/globals'
import { EditorWorker, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import * as CompletionStates from '../src/parts/CompletionStates/CompletionStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleEditorDeleteLeft } from '../src/parts/HandleEditorDeleteLeft/HandleEditorDeleteLeft.ts'
import { handleEditorType } from '../src/parts/HandleEditorType/HandleEditorType.ts'
import { hasItems } from '../src/parts/HasItems/HasItems.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

for (const [name, update] of [
  ['typing', handleEditorType],
  ['backspace', handleEditorDeleteLeft],
] as const) {
  test(`automatic ${name} requests fresh results and reports transition to empty`, async () => {
    using editorRpc = EditorWorker.registerMockRpc({
      'Editor.getLines2': () => ['object.'],
      'Editor.getOffsetAtCursor': () => 7,
      'Editor.getPositionAtCursor': () => ({ columnIndex: 7, rowIndex: 0, x: 100, y: 100 }),
      'Editor.getUri': () => 'file:///test.ts',
      'Editor.getWordAtOffset2': () => '',
    })
    let items = [{ flags: 0, kind: 1, label: 'member' }]
    using extensionRpc = ExtensionManagementWorker.registerMockRpc({
      'Extensions.invokeForApplication': () => items,
    })
    const state = {
      ...createDefaultState('test-application'),
      automatic: true,
      editorLanguageId: 'typescript',
      unfilteredItems: [{ flags: 0, kind: 1, label: 'obsolete' }],
    }
    const { uid } = state
    const refreshed = await update(state)
    expect(refreshed.items.map((item) => item.label)).toEqual(['member'])
    expect(refreshed.unfilteredItems).toEqual(items)
    expect(refreshed.focusedIndex).toBe(0)
    CompletionStates.set(uid, state, refreshed)
    expect(hasItems(uid)).toBe(true)

    items = []
    const empty = await update(refreshed)
    expect(empty.items).toEqual([])
    expect(empty.focusedIndex).toBe(-1)
    expect(empty.automatic).toBe(true)
    expect(empty.version).toBe(refreshed.version + 1)
    CompletionStates.set(uid, refreshed, empty)
    expect(hasItems(uid)).toBe(false)
    expect(extensionRpc.invocations).toHaveLength(2)
    expect(editorRpc.invocations).toContainEqual(['Editor.getOffsetAtCursor', 0])
    CompletionStates.dispose(uid)
  })
}

test('explicit load can replace automatic intent and retain empty feedback height', async () => {
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': () => [''],
    'Editor.getOffsetAtCursor': () => 0,
    'Editor.getPositionAtCursor': () => ({ columnIndex: 0, rowIndex: 0, x: 0, y: 0 }),
    'Editor.getUri': () => 'file:///test.ts',
    'Editor.getWordAtOffset2': () => '',
  })
  using extensionRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': () => [],
  })
  const state = { ...createDefaultState('test-application'), automatic: true }
  const result = await loadContent(state, false)
  expect(result.automatic).toBe(false)
  expect(result.height).toBe(20)
  expect(result.items).toEqual([])
  expect(editorRpc.invocations).toContainEqual(['Editor.getOffsetAtCursor', 0])
  expect(extensionRpc.invocations).toHaveLength(1)
})
