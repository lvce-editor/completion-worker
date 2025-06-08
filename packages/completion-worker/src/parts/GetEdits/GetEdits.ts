import type { Change } from '../Change/Change.ts'
import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import * as GetLines from '../GetLines/GetLines.ts'
import * as GetSelections from '../GetSelections/GetSelections.ts'
import * as ReplaceRange from '../ReplaceRange/ReplaceRange.ts'
import { resolveCompletion } from '../ResolveCompletion/ResolveCompletion.ts'

export const getEdits = async (editorUid: number, leadingWord: string, completionItem: CompletionItem): Promise<readonly Change[]> => {
  const word = completionItem.label
  const resolvedItem = await resolveCompletion(editorUid, word, completionItem)
  const inserted = resolvedItem ? resolvedItem.snippet : word
  const lines = await GetLines.getLines(editorUid)
  const selections = await GetSelections.getSelections(editorUid)
  const [startRowIndex, startColumnIndex] = selections
  const leadingWordLength = leadingWord.length
  const replaceRange = new Uint32Array([startRowIndex, startColumnIndex - leadingWordLength, startRowIndex, startColumnIndex])
  const changes = ReplaceRange.replaceRange(lines, replaceRange, [inserted], '')
  return changes
}
