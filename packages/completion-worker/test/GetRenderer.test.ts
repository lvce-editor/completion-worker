import { test, expect } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { getRenderer } from '../src/parts/GetRenderer/GetRenderer.ts'
import * as RenderBounds from '../src/parts/RenderBounds/RenderBounds.ts'
import * as RenderContent from '../src/parts/RenderContent/RenderContent.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'
import * as RenderFocusContext from '../src/parts/RenderFocusContext/RenderFocusContext.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import * as RenderUid from '../src/parts/RenderUid/RenderUid.ts'

test('getRenderer', () => {
  expect(getRenderer(DiffType.RenderContent)).toBe(RenderContent.renderContent)
  expect(getRenderer(DiffType.RenderBounds)).toBe(RenderBounds.renderBounds)
  expect(getRenderer(DiffType.RenderEventListeners)).toBe(RenderEventListeners.renderEventListeners)
  expect(getRenderer(DiffType.RenderUid)).toBe(RenderUid.renderUid)
  expect(getRenderer(DiffType.RenderItems)).toBe(RenderItems.renderItems)
  expect(getRenderer(DiffType.RenderFocusContext)).toBe(RenderFocusContext.renderFocusContext)
})

test('getRenderer throws for unknown diff type', () => {
  expect(() => getRenderer(999)).toThrow('unknown renderer')
})
