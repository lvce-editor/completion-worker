import * as GetLines from '../GetLines/GetLines.ts'
import * as GetWordAtOffset from '../GetWordAtOffset/GetWordAtOffset.ts'

/* eslint-disable sonarjs/super-linear-regex */
const RE_JSON_COMPLETION_WORD = /[\w.-]+$/

const getJsonCompletionWord = async (editorUid: number, rowIndex: number, columnIndex: number): Promise<string> => {
  const lines = await GetLines.getLines(editorUid)
  const line = lines[rowIndex] || ''
  const match = line.slice(0, columnIndex).match(RE_JSON_COMPLETION_WORD)
  return match?.[0] || ''
}

export const getCompletionWord = async (
  editorUid: number,
  editorLanguageId: string,
  rowIndex: number,
  columnIndex: number,
  getFallbackWord?: () => Promise<string>,
): Promise<string> => {
  if (editorLanguageId === 'json' || editorLanguageId === 'jsonc') {
    return getJsonCompletionWord(editorUid, rowIndex, columnIndex)
  }
  if (getFallbackWord) {
    return getFallbackWord()
  }
  return GetWordAtOffset.getWordAtOffset(editorUid)
}
