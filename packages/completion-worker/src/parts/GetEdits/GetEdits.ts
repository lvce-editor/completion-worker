import type { Change } from '../Change/Change.ts'
import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import * as GetLines from '../GetLines/GetLines.ts'
import * as GetSelections from '../GetSelections/GetSelections.ts'
import * as ReplaceRange from '../ReplaceRange/ReplaceRange.ts'
import { resolveCompletion } from '../ResolveCompletion/ResolveCompletion.ts'

const getReplaceLength = (line: string, columnIndex: number, leadingWord: string, label: string): number => {
  const maximumLength = Math.min(columnIndex, label.length)
  for (let length = maximumLength; length > leadingWord.length; length--) {
    const startColumnIndex = columnIndex - length
    if (line.slice(startColumnIndex, columnIndex) === label.slice(0, length)) {
      return length
    }
  }
  return leadingWord.length
}

export const getEdits = async (editorUid: number, leadingWord: string, completionItem: CompletionItem): Promise<readonly Change[]> => {
  const word = completionItem.label
  const resolvedItem = await resolveCompletion(editorUid, word, completionItem)
  const inserted = resolvedItem ? resolvedItem.snippet : word
  const lines = await GetLines.getLines(editorUid)
  const selections = await GetSelections.getSelections(editorUid)
  const [startRowIndex, startColumnIndex] = selections
  const line = lines[startRowIndex] || ''
  const replaceLength = getReplaceLength(line, startColumnIndex, leadingWord, word)
  const replaceRange = new Uint32Array([startRowIndex, startColumnIndex - replaceLength, startRowIndex, startColumnIndex])
  const changes = ReplaceRange.replaceRange(lines, replaceRange, [inserted], '')
  return changes
}
