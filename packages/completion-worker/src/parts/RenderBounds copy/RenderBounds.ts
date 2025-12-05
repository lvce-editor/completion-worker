import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderBounds = (oldState: CompletionState, newState: CompletionState): readonly any[] => {
  const { height, uid, width, x, y } = newState
  return [RenderMethod.SetBounds, uid, x, y, width, height]
}
