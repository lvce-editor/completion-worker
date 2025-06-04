import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleWheel,
      params: ['EditorCompletion.handleWheel', 'event.deltaMode', 'event.deltaY'],
      passive: true,
    },
  ]
}
