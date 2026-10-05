import type { Range } from '../Change/Change.ts'
import type { CompletionEdit } from '../CompletionEdit/CompletionEdit.ts'
import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import * as GetLines from '../GetLines/GetLines.ts'
import * as GetSelectionChanges from '../GetSelectionChanges/GetSelectionChanges.ts'
import * as GetSelections from '../GetSelections/GetSelections.ts'
import * as ReplaceRange from '../ReplaceRange/ReplaceRange.ts'
import { resolveCompletion } from '../ResolveCompletion/ResolveCompletion.ts'

const newLineRegex = /\r?\n/
const identifierPartRegex = /[$_\p{ID_Continue}]/u

interface PositionRange {
  readonly end: Range
  readonly start: Range
}

const isIdentifierPart = (value: string): boolean => identifierPartRegex.test(value)

const getPositionAtOffset = (lines: readonly string[], offset: number): readonly [number, number] | undefined => {
  let remainingOffset = offset
  for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
    const line = lines[rowIndex]
    if (remainingOffset <= line.length) {
      return [rowIndex, remainingOffset]
    }
    remainingOffset -= line.length + 1
  }
  return undefined
}

const getOffsetAtPosition = (lines: readonly string[], rowIndex: number, columnIndex: number): number => {
  let offset = columnIndex
  for (let i = 0; i < rowIndex; i++) {
    offset += lines[i].length + 1
  }
  return offset
}

const getReplacementRange = (
  lines: readonly string[],
  completionItem: CompletionItem,
  cursorRow: number,
  cursorColumn: number,
  leadingWord: string,
): PositionRange => {
  const { replacementRange } = completionItem
  if (replacementRange) {
    const { endOffset, startOffset } = replacementRange
    const cursorOffset = getOffsetAtPosition(lines, cursorRow, cursorColumn)
    if (
      Number.isSafeInteger(startOffset) &&
      Number.isSafeInteger(endOffset) &&
      startOffset >= 0 &&
      endOffset >= startOffset &&
      cursorOffset >= startOffset &&
      cursorOffset <= endOffset
    ) {
      const start = getPositionAtOffset(lines, startOffset)
      const end = getPositionAtOffset(lines, endOffset)
      if (start && end) {
        return {
          end: { columnIndex: end[1], rowIndex: end[0] },
          start: { columnIndex: start[1], rowIndex: start[0] },
        }
      }
    }
  }
  const line = lines[cursorRow] || ''
  let endColumn = cursorColumn
  while (endColumn < line.length) {
    const value = String.fromCodePoint(line.codePointAt(endColumn)!)
    if (!isIdentifierPart(value)) {
      break
    }
    endColumn += value.length
  }
  return {
    end: { columnIndex: endColumn, rowIndex: cursorRow },
    start: { columnIndex: Math.max(0, cursorColumn - leadingWord.length), rowIndex: cursorRow },
  }
}

export const getEdits = async (
  editorUid: number,
  leadingWord: string,
  completionItem: CompletionItem,
  applicationId: string | undefined,
): Promise<CompletionEdit> => {
  const word = completionItem.label
  const resolvedItem = await resolveCompletion(editorUid, word, completionItem, applicationId)
  let inserted = word
  if (typeof completionItem.snippet === 'string') {
    inserted = completionItem.snippet
  }
  if (typeof resolvedItem?.snippet === 'string') {
    inserted = resolvedItem.snippet
  }
  const lines = await GetLines.getLines(editorUid)
  const selections = await GetSelections.getSelections(editorUid)
  const [startRowIndex, startColumnIndex] = selections
  const range = getReplacementRange(lines, completionItem, startRowIndex, startColumnIndex, leadingWord)
  const nextCharacter = lines[range.end.rowIndex]?.[range.end.columnIndex]
  if (nextCharacter === '(' && inserted.endsWith('()')) {
    inserted = inserted.slice(0, -2)
  }
  const replaceRange = new Uint32Array([range.start.rowIndex, range.start.columnIndex, range.end.rowIndex, range.end.columnIndex])
  const changes = ReplaceRange.replaceRange(lines, replaceRange, inserted.split(newLineRegex), '')
  const selectionChanges = GetSelectionChanges.getSelectionChanges(
    inserted,
    range.start.rowIndex,
    range.start.columnIndex,
    resolvedItem?.selectionRange,
  )
  return { changes, selectionChanges }
}
