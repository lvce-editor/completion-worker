import type { RenameState } from '../RenameState/RenameState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const renderFocusContext = (oldState: RenameState, newState: RenameState): readonly any[] => {
  return [/* method */ 'Viewlet.setFocusContext', WhenExpression.FocusEditorRename]
}
