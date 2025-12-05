import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as FindWidgetStates from '../CompletionStates/CompletionStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly any[] => {
  const { newState, oldState } = FindWidgetStates.get(uid)
  FindWidgetStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
