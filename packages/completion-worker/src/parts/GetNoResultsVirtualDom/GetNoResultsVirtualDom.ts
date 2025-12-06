import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'

const parentNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Div,
}

export const getNoResultsVirtualDom = (): readonly VirtualDomNode[] => {
  return [parentNode, text(EditorStrings.noSuggestions())]
}
