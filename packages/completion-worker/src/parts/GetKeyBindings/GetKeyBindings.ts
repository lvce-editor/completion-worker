import * as KeyCode from '../KeyCode/KeyCode.ts'
import * as KeyModifier from '../KeyModifier/KeyModifier.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as WidgetId from '../WidgetId/WidgetId.ts'

const getCommand = (shortId: string): any => {
  return {
    command: 'Editor.executeWidgetCommand',
    args: ['Completions', `Completions.${shortId}`, 0, WidgetId.Completion],
  }
}

export const getKeyBindings = (): readonly any[] => {
  return [
    {
      key: KeyCode.DownArrow,
      ...getCommand('focusNext'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.UpArrow,
      ...getCommand('focusPrevious'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.Enter,
      ...getCommand('selectCurrent'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.End,
      ...getCommand('focusLast'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.Home,
      ...getCommand('focusFirst'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyModifier.CtrlCmd | KeyCode.Space,
      ...getCommand('toggleDetails'),
      when: WhenExpression.FocusEditorCompletions,
    },
  ]
}
