import { expect, test } from '@jest/globals'
import { KeyCode, KeyModifier } from '@lvce-editor/virtual-dom-worker'
import * as GetKeyBindings from '../src/parts/GetKeyBindings/GetKeyBindings.ts'

test('getKeyBindings returns correct key bindings', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toBeDefined()
  expect(keyBindings).not.toContainEqual(expect.objectContaining({
    key: KeyModifier.CtrlCmd | KeyCode.Space,
  }))
})
