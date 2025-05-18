import type { CompletionState } from '../CompletionState/CompletionState.ts'
import { getEventListeners } from '../GetEventListeners/GetEventListeners.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderEventListeners = (state: CompletionState): readonly any[] => {
  const { uid } = state
  const eventListeners = getEventListeners(uid)
  return [RenderMethod.SetEventListeners, uid, eventListeners]
}
