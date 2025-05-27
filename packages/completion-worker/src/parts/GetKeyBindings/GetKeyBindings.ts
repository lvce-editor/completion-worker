import * as KeyCode from '../KeyCode/KeyCode.ts'
import * as KeyModifier from '../KeyModifier/KeyModifier.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as WidgetId from '../WidgetId/WidgetId.ts'

const getCommand = (shortId: string, uid: number): any => {
  return {
    command: 'Editor.executeWidgetCommand',
    args: ['Completion', `EditorCompletion.${shortId}`, uid, WidgetId.Completion],
  }
}

export const getKeyBindings = (uid: number): readonly any[] => {
  return [
    {
      key: KeyCode.DownArrow,
      ...getCommand('focusNext', uid),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.UpArrow,
      ...getCommand('focusPrevious', uid),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.Enter,
      ...getCommand('selectCurrent', uid),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.End,
      ...getCommand('focusLast', uid),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.Home,
      ...getCommand('focusFirst', uid),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyModifier.CtrlCmd | KeyCode.Space,
      ...getCommand('toggleDetails', uid),
      when: WhenExpression.FocusEditorCompletions,
    },
  ]
}
