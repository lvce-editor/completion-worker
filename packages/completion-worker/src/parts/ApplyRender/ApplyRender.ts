import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as GetRenderer from '../GetRenderer/GetRenderer.ts'

export const applyRender = (oldState: CompletionState, newState: CompletionState, diffResult: readonly number[]): readonly any[] => {
  const commands = []
  for (const item of diffResult) {
    const fn = GetRenderer.getRenderer(item)
    commands.push(fn(oldState, newState))
  }
  return commands
}
