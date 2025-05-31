export interface Range {
  readonly rowIndex: number
  readonly columnIndex: number
}

export interface Selection {
  readonly start: Range
  readonly end: Range
}

export interface Change {
  readonly start: Range
  readonly end: Range
  readonly inserted: readonly string[]
  readonly deleted: readonly string[]
  readonly origin: string
}
