import { expect, test } from '@jest/globals'
import { EditorWorker, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { get } from '../src/parts/CompletionStates/CompletionStates.ts'
import { create } from '../src/parts/Create/Create.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import { select } from '../src/parts/Select/Select.ts'

test('completion discovery and resolution stay in the owning application', async () => {
  const editorRpc = EditorWorker.registerMockRpc({
    'Editor.applyEdit2': () => undefined,
    'Editor.closeWidget2': () => undefined,
    'Editor.getLanguageId': () => 'plaintext',
    'Editor.getLines2': () => ['gr'],
    'Editor.getOffsetAtCursor': () => 2,
    'Editor.getPositionAtCursor': () => ({ columnIndex: 2, rowIndex: 0, x: 0, y: 0 }),
    'Editor.getSelections2': () => new Uint32Array([0, 2, 0, 2]),
    'Editor.getUri': () => 'memfs:///preview/example.txt',
    'Editor.getWordAtOffset2': () => 'gr',
  })
  const extensionRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCompletionProvider': () => [],
    'Extensions.invokeForApplication': (applicationId: string, command: string) => {
      expect(applicationId).toBe('preview')
      if (command === 'Extensions.executeCompletionProvider') return [{ label: 'green' }]
      expect(command).toBe('Extensions.executeResolveCompletionItemProvider')
      return { snippet: 'green-resolved' }
    },
  })
  create(8, 0, 0, 0, 0, 7, 'plaintext', 'preview')
  const state = await loadContent(get(8).newState)
  expect(state.items.map((item) => item.label)).toEqual(['green'])
  await select(state, state.items[0])
  expect(extensionRpc.invocations.map((call) => call.slice(0, 3))).toEqual([
    ['Extensions.invokeForApplication', 'preview', 'Extensions.executeCompletionProvider'],
    ['Extensions.invokeForApplication', 'preview', 'Extensions.executeResolveCompletionItemProvider'],
  ])
  const applied = editorRpc.invocations.find((call) => call[0] === 'Editor.applyEdit2')
  expect(applied).toBeDefined()
  expect(JSON.stringify(applied)).toContain('green-resolved')
})
