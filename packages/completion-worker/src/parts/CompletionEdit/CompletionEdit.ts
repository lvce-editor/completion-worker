import type { Change } from '../Change/Change.ts'

export interface CompletionEdit {
  readonly changes: readonly Change[]
  readonly selectionChanges: Uint32Array | undefined
}
