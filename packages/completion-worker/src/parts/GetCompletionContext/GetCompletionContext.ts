import { EditorWorker } from '@lvce-editor/rpc-registry'
import * as GetLines from '../GetLines/GetLines.ts'
import * as GetPositionAtCursor from '../GetPositionAtCursor/GetPositionAtCursor.ts'
import * as GetWordBefore from '../GetWordBefore/GetWordBefore.ts'

export interface CompletionContext {
  readonly columnIndex: number
  readonly editorWidth: number
  readonly editorX: number
  readonly line?: string
  readonly rowIndex: number
  readonly wordBefore?: string
  readonly x: number
  readonly y: number
}

const RE_UNKNOWN_COMMAND = /command (?:not found Editor\.getCompletionContext|Editor\.getCompletionContext not found)/i

const isUnknownCommandError = (error: unknown): boolean => error instanceof Error && RE_UNKNOWN_COMMAND.test(error.message)

const getLegacyCompletionContext = async (editorUid: number, includeLine: boolean): Promise<CompletionContext> => {
  const position = await GetPositionAtCursor.getPositionAtCursor(editorUid)
  if (includeLine) {
    const lines = await GetLines.getLines(editorUid)
    return { ...position, line: lines[position.rowIndex] || '' }
  }
  const wordBefore = await GetWordBefore.getWordBefore(editorUid, position.rowIndex, position.columnIndex)
  return { ...position, wordBefore }
}

export const getCompletionContext = async (editorUid: number, includeLine: boolean): Promise<CompletionContext> => {
  try {
    return await EditorWorker.invoke('Editor.getCompletionContext', editorUid, includeLine)
  } catch (error) {
    if (!isUnknownCommandError(error)) {
      throw error
    }
    return getLegacyCompletionContext(editorUid, includeLine)
  }
}
