import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderContent = (oldState: CompletionState, newState: CompletionState): readonly any[] => {
  const { uid } = newState
  const dom: readonly VirtualDomNode[] = []
  return [RenderMethod.SetDom2, uid, dom]
}
