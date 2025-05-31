import * as Completions from '../Completions/Completions.ts'
import * as ReplaceRange from '../ReplaceRange/ReplaceRange.ts'

export const getEdits = async (editorUid: number, leadingWord: string, completionItem: any): Promise<readonly any[]> => {
  const word = completionItem.label
  const resolvedItem = await Completions.resolveCompletion(editorUid, word, completionItem)
  const inserted = resolvedItem ? resolvedItem.snippet : word
  // TODO type and dispose commands should be sent to renderer process at the same time
  // @ts-ignore
  const { selections } = editor
  const [startRowIndex, startColumnIndex] = selections
  const leadingWordLength = leadingWord.length
  const replaceRange = new Uint32Array([startRowIndex, startColumnIndex - leadingWordLength, startRowIndex, startColumnIndex])
  // @ts-ignore
  const changes = ReplaceRange.replaceRange(editor, replaceRange, [inserted], '')
  return changes
}
