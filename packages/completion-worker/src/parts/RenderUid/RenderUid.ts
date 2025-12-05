import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderUid = (oldState: CompletionState, newState: CompletionState): readonly any[] => {
  const { editorUid, uid } = newState
  return [RenderMethod.SetUid, uid, editorUid]
}
