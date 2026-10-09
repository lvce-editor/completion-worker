import { EditorWorker } from '@lvce-editor/rpc-registry'

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

export const getCompletionContext = (editorUid: number, includeLine: boolean): Promise<CompletionContext> =>
  EditorWorker.invoke('Editor.getCompletionContext', editorUid, includeLine)
