import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as ColorPickerStates from '../CompletionStates/CompletionStates.ts'
import * as Diff from '../Diff/Diff.ts'

export const doRender = (uid: number): readonly any[] => {
  const { oldState, newState } = ColorPickerStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
