import type { Selection } from '../Change/Change.ts'

export const getSelectionText = (lines: readonly string[], range: Selection): readonly string[] => {
  const startRowIndex = range.start.rowIndex
  const startColumnIndex = range.start.columnIndex
  const endRowIndex = Math.min(range.end.rowIndex, lines.length - 1)
  const endColumnIndex = range.end.columnIndex

  if (startRowIndex === endRowIndex) {
    return [lines[startRowIndex].slice(startColumnIndex, endColumnIndex)]
  }
  const selectedLines = [
    lines[startRowIndex].slice(startColumnIndex),
    ...lines.slice(startRowIndex + 1, endRowIndex),
    lines[endRowIndex].slice(0, endColumnIndex),
  ]
  return selectedLines
}
