export interface Range {
  readonly columnIndex: number
  readonly rowIndex: number
}

export interface Selection {
  readonly end: Range
  readonly start: Range
}

export interface Change {
  readonly deleted: readonly string[]
  readonly end: Range
  readonly inserted: readonly string[]
  readonly origin: string
  readonly start: Range
}
