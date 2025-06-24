import type { Change, Range } from '../Change/Change.ts'
import * as GetSelectionPairs from '../GetSelectionPairs/GetSelectionPairs.ts'
import * as GetSelectionText from '../GetSelectionText/GetSelectionText.ts'

export const replaceRange = (lines: readonly string[], ranges: Uint32Array, replacement: readonly string[], origin: string): readonly Change[] => {
  const changes: Change[] = []
  const rangesLength = ranges.length
  for (let i = 0; i < rangesLength; i += 4) {
    const [selectionStartRow, selectionStartColumn, selectionEndRow, selectionEndColumn] = GetSelectionPairs.getSelectionPairs(ranges, i)
    const start = {
      rowIndex: selectionStartRow,
      columnIndex: selectionStartColumn,
    }
    const end: Range = {
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
