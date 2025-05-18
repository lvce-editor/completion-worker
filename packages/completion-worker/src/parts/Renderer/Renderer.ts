import type { CompletionState } from '../CompletionState/CompletionState.ts'

export interface Renderer {
  (oldState: CompletionState, newState: CompletionState): readonly any[]
}
