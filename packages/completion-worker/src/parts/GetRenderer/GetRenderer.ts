import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RenderBounds from '../RenderBounds/RenderBounds.ts'
import * as RenderContent from '../RenderContent/RenderContent.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as RenderFocusContext from '../RenderFocusContext/RenderFocusContext.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'
import * as RenderUid from '../RenderUid/RenderUid.ts'

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderContent:
      return RenderContent.renderContent
    case DiffType.RenderBounds:
      return RenderBounds.renderBounds
    case DiffType.RenderEventListeners:
      return RenderEventListeners.renderEventListeners
    case DiffType.RenderUid:
      return RenderUid.renderUid
    case DiffType.RenderItems:
      return RenderItems.renderItems
    case DiffType.RenderFocusContext:
      return RenderFocusContext.renderFocusContext
    default:
      throw new Error('unknown renderer')
  }
}
