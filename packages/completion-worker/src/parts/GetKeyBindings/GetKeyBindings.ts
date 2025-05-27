import * as KeyCode from '../KeyCode/KeyCode.ts'
import * as KeyModifier from '../KeyModifier/KeyModifier.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly any[] => {
  return [
    {
      key: KeyCode.DownArrow,
      command: 'EditorCompletion.focusNext',
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.UpArrow,
      command: 'EditorCompletion.focusPrevious',
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.Enter,
      command: 'EditorCompletion.selectCurrent',
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.End,
      command: 'EditorCompletion.focusLast',
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.Home,
      command: 'EditorCompletion.focusFirst',
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyModifier.CtrlCmd | KeyCode.Space,
      command: 'EditorCompletion.toggleDetails',
      when: WhenExpression.FocusEditorCompletions,
    },
  ]
}
