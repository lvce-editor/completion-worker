interface CompletionSelectionRange {
  readonly endOffset?: unknown
  readonly startOffset?: unknown
}

const newLineRegex = /\r?\n/

const isInteger = (value: unknown): value is number => {
  return typeof value === 'number' && Number.isSafeInteger(value)
}

const getPositionAtOffset = (text: string, rowIndex: number, columnIndex: number, offset: number): readonly [number, number] => {
  const prefix = text.slice(0, offset)
  const lines = prefix.split(newLineRegex)
  if (lines.length === 1) {
    return [rowIndex, columnIndex + lines[0].length]
  }
  return [rowIndex + lines.length - 1, lines.at(-1)?.length ?? 0]
}

export const getSelectionChanges = (
  inserted: string,
  rowIndex: number,
  columnIndex: number,
  selectionRange: unknown,
): Uint32Array | undefined => {
  if (!selectionRange || typeof selectionRange !== 'object') {
    return undefined
  }
  const { endOffset, startOffset } = selectionRange as CompletionSelectionRange
  if (
    !isInteger(startOffset) ||
    !isInteger(endOffset) ||
    startOffset < 0 ||
    endOffset < startOffset ||
    endOffset > inserted.length
  ) {
    return undefined
  }
  const [startRowIndex, startColumnIndex] = getPositionAtOffset(inserted, rowIndex, columnIndex, startOffset)
  const [endRowIndex, endColumnIndex] = getPositionAtOffset(inserted, rowIndex, columnIndex, endOffset)
  return new Uint32Array([startRowIndex, startColumnIndex, endRowIndex, endColumnIndex])
}
