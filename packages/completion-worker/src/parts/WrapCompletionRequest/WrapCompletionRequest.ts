import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as CompletionStates from '../CompletionStates/CompletionStates.ts'

export const wrapCompletionRequest = (fn: (state: CompletionState, ...args: readonly any[]) => Promise<CompletionState>) => {
  return async (uid: number, ...args: readonly any[]): Promise<void> => {
    const instance = CompletionStates.get(uid)
    if (!instance) {
      return
    }
    // Each request owns a unique snapshot, even when multiple requests start before any finish.
    const pending = { ...instance.newState }
    CompletionStates.set(uid, instance.oldState, pending)
    const result = await fn(pending, ...args)
    const latest = CompletionStates.get(uid)
    if (latest?.newState !== pending) {
      return
    }
    CompletionStates.set(uid, latest.oldState, result)
  }
}
