export interface VisibleCompletionItem {
  readonly deprecated: number | boolean
  readonly fileIcon: string
  readonly focused: boolean
  readonly highlights: readonly number[]
  readonly label: string
  readonly symbolName: string
  readonly top: number
}
