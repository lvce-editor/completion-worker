import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import type { CompletionState } from '../src/parts/CompletionState/CompletionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'

test('renderItems returns correct render method and dom', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return Promise.resolve([])
      }
      if (method === 'FileSystem.readFile') {
        return Promise.resolve('')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RpcRegistry.set(RendererWorker, mockRpc)

  const oldState = createDefaultState()
  const newState: CompletionState = {
    ...createDefaultState(),
    uid: 1,
    height: 200,
    deltaY: 0,
    items: [{ label: 'test', kind: 1, flags: 0, matches: [0, 2, 2, 4] }],
    itemHeight: 20,
    leadingWord: '',
    minLineY: 0,
    maxLineY: 1,
    focusedIndex: 0,
    maxHeight: 200,
    focused: false,
    unfilteredItems: [],
    version: 1,
    editorUid: 1,
    editorLanguageId: 'typescript',
    maxItems: 100,
    finalDeltaY: 0,
    headerHeight: 0,
    x: 0,
    y: 0,
    width: 200,
  }

  const result = renderItems(oldState, newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBe(1)
  expect(result[2]).toBeDefined()
})
