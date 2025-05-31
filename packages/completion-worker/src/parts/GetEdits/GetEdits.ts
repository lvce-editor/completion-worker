import * as Completions from '../Completions/Completions.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as ReplaceRange from '../ReplaceRange/ReplaceRange.ts'

export const getEdits = async (editorUid: number, leadingWord: string, completionItem: any): Promise<readonly any[]> => {
  const word = completionItem.label
  const resolvedItem = await Completions.resolveCompletion(editorUid, word, completionItem)
  const inserted = resolvedItem ? resolvedItem.snippet : word
  const lines = await EditorWorker.invoke('Editor.getLines2', editorUid)
  const selections = await EditorWorker.invoke('Editor.getSelections2', editorUid)
  const [startRowIndex, startColumnIndex] = selections
  const leadingWordLength = leadingWord.length
  const replaceRange = new Uint32Array([startRowIndex, startColumnIndex - leadingWordLength, startRowIndex, startColumnIndex])
  const changes = ReplaceRange.replaceRange(lines, replaceRange, [inserted], '')
  return changes
}
