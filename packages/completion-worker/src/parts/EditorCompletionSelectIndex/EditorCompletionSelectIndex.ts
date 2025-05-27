import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as Completions from '../Completions/Completions.ts'
import * as ReplaceRange from '../ReplaceRange/ReplaceRange.ts'

// @ts-ignore
const getEdits = async (state: CompletionState, completionItem: any) => {
  const { leadingWord, editorUid } = state
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

const select = async (state: CompletionState, completionItem: any): Promise<CompletionState> => {
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

export const selectIndex = async (state: CompletionState, index: number): Promise<CompletionState> => {
  const { items } = state
  if (index === -1) {
    return state
  }
  if (index > items.length) {
    throw new Error('index too large')
  }
  const actualIndex = index
  const completionItem = items[actualIndex]
  return select(state, completionItem)
}
