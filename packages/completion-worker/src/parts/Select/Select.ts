import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import { getEdits } from '../GetEdits/GetEdits.ts'

export const select = async (state: CompletionState, completionItem: any): Promise<CompletionState> => {
  const { editorUid, leadingWord } = state
  const changes = await getEdits(editorUid, leadingWord, completionItem)
  // @ts-ignore
  await EditorWorker.invoke('Editor.applyEdit2', editorUid, changes)
  // TODO remove completion widget from editor
  return {
    ...state,
  }
}
