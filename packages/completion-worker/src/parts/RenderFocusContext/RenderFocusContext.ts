import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const renderFocusContext = (oldState: CompletionState, newState: CompletionState): readonly any[] => {
  return [/* method */ 'Viewlet.setFocusContext', WhenExpression.FocusEditorRename]
}
