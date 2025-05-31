export interface VisibleCompletionItem {
  readonly label: string
  readonly symbolName: string
  readonly top: number
  readonly highlights: readonly number[]
  readonly focused: boolean
  readonly deprecated: number
  readonly fileIcon: string
}
