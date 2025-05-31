import type { CompletionState } from '../CompletionState/CompletionState.ts'

export const select = async (state: CompletionState, completionItem: any): Promise<CompletionState> => {
  // TODO ask editor worker to apply changes and close completion widget
  // const changes = await getEdits(state, completionItem)
  // TODO ask editor worker to remove widget
  // const index = state.widgets
  //   .indexOf
  //   // ViewletModuleId.EditorCompletion
  //   ()
  // if (index !== -1) {
  //   state.widgets.splice(index, 1)
  //   state.completionState = EditorCompletionState.None
  //   state.completionUid = 0
  // }
  // // TODO dispose completion widget
  // // TODO apply edit in editor worker instead of asking renderer worker
  // // await RendererWorker.invoke('Viewlet.dispose', state.uid)
  // const { widgets } = state
  // const newWidgets = RemoveEditorWidget.removeEditorWidget(widgets, WidgetId.Completion)
  // const intermediateEditor = await EditorCommandApplyEdit.applyEdit(state, changes)
  return {
    ...state,
  }
}
