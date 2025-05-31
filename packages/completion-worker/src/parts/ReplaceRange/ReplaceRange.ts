import * as GetSelectionPairs from '../GetSelectionPairs/GetSelectionPairs.ts'
import * as GetSelectionText from '../GetSelectionText/GetSelectionText.ts'

// TODO add more exact types
export const replaceRange = (lines: readonly string[], ranges: any, replacement: any, origin: any) => {
  const changes: any[] = []
  const rangesLength = ranges.length
  for (let i = 0; i < rangesLength; i += 4) {
    const [selectionStartRow, selectionStartColumn, selectionEndRow, selectionEndColumn] = GetSelectionPairs.getSelectionPairs(ranges, i)
    const start = {
      rowIndex: selectionStartRow,
      columnIndex: selectionStartColumn,
    }
    const end = {
      rowIndex: selectionEndRow,
      columnIndex: selectionEndColumn,
    }
    const selection = {
      start,
      end,
    }
    changes.push({
      start: start,
      end: end,
      inserted: replacement,
      deleted: GetSelectionText.getSelectionText(lines, selection),
      origin,
    })
  }
  return changes
}
