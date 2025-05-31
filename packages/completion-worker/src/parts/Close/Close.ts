import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as WidgetId from '../WidgetId/WidgetId.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const close = async (editorUid: number): Promise<void> => {
  // @ts-ignore
  await EditorWorker.invoke('Editor.closeWidget2', editorUid, WidgetId.Completion, 'Completions', WhenExpression.FocusEditorCompletions)
}
