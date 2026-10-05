export interface CompletionItem {
  readonly flags: number
  readonly kind: number
  readonly label: string
  readonly matches: readonly number[]
  readonly replacementRange?: {
    readonly endOffset: number
    readonly startOffset: number
  }
  readonly snippet?: string
}
