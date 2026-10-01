import type { CompletionEdit } from '../CompletionEdit/CompletionEdit.ts'
import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import * as GetLines from '../GetLines/GetLines.ts'
import * as GetSelectionChanges from '../GetSelectionChanges/GetSelectionChanges.ts'
import * as GetSelections from '../GetSelections/GetSelections.ts'
import * as ReplaceRange from '../ReplaceRange/ReplaceRange.ts'
import { resolveCompletion } from '../ResolveCompletion/ResolveCompletion.ts'

const newLineRegex = /\r?\n/

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
  const leadingWordLength = leadingWord.length
  const replaceStartColumnIndex = startColumnIndex - leadingWordLength
  const replaceRange = new Uint32Array([startRowIndex, replaceStartColumnIndex, startRowIndex, startColumnIndex])
  const changes = ReplaceRange.replaceRange(lines, replaceRange, inserted.split(newLineRegex), '')
  const selectionChanges = GetSelectionChanges.getSelectionChanges(inserted, startRowIndex, replaceStartColumnIndex, resolvedItem?.selectionRange)
  return { changes, selectionChanges }
}
