import * as CompletionStates from '../CompletionStates/CompletionStates.ts'

export const dispose = (uid: number): void => {
  CompletionStates.dispose(uid)
}
