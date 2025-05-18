import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RenderContent from '../RenderContent/RenderContent.ts'

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderContent:
      return RenderContent.renderContent
    default:
      throw new Error('unknown renderer')
  }
}
