import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderBounds = (oldState: CompletionState, newState: CompletionState): readonly any[] => {
  const { x, y, width, height, uid } = newState
  return [RenderMethod.SetBounds, uid, x, y, width, height]
}
