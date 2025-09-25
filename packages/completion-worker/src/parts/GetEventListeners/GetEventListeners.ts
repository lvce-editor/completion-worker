import { EventExpression } from '@lvce-editor/constants'
import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleWheel,
      params: ['EditorCompletion.handleWheel', EventExpression.DeltaMode, EventExpression.DeltaY],
      passive: true,
    },
    {
      name: DomEventListenerFunctions.HandlePointerDown,
      params: ['EditorCompletion.handlePoinerDown', EventExpression.ClientX, EventExpression.ClientY],
      preventDefault: true,
    },
  ]
}
