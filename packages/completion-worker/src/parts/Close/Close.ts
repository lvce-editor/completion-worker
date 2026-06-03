import type { CompletionState } from '../CompletionState/CompletionState.ts'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as WidgetId from '../WidgetId/WidgetId.ts'

export const close = async (state: CompletionState): Promise<CompletionState> => {
  const { editorUid } = state
  await EditorWorker.closeWidget(editorUid, WidgetId.Completion, 'Completions', WhenExpression.FocusEditorCompletions)
  return state
}
