import type { Change, Range } from '../Change/Change.ts'
import * as GetSelectionPairs from '../GetSelectionPairs/GetSelectionPairs.ts'
import * as GetSelectionText from '../GetSelectionText/GetSelectionText.ts'

export const replaceRange = (lines: readonly string[], ranges: Uint32Array, replacement: readonly string[], origin: string): readonly Change[] => {
  const changes: Change[] = []
  const rangesLength = ranges.length
  for (let i = 0; i < rangesLength; i += 4) {
    const [selectionStartRow, selectionStartColumn, selectionEndRow, selectionEndColumn] = GetSelectionPairs.getSelectionPairs(ranges, i)
    const start = {
      columnIndex: selectionStartColumn,
      rowIndex: selectionStartRow,
    }
    const end: Range = {
      columnIndex: selectionEndColumn,
      rowIndex: selectionEndRow,
    }
    const selection = {
      end,
      start,
    }
    changes.push({
      deleted: GetSelectionText.getSelectionText(lines, selection),
      end: end,
      inserted: replacement,
      origin,
      start: start,
    })
  }
  return changes
}
