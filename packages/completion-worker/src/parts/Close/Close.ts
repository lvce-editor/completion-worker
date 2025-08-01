import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as WidgetId from '../WidgetId/WidgetId.ts'

export const close = async (state: CompletionState): Promise<CompletionState> => {
  const { editorUid } = state
  await EditorWorker.closeWidget(editorUid, WidgetId.Completion, 'Completions', WhenExpression.FocusEditorCompletions)
  return state
}
