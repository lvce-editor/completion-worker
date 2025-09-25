import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'

const parentNode: VirtualDomNode = {
  type: VirtualDomElements.Div,
  childCount: 1,
}

export const getNoResultsVirtualDom = (): readonly VirtualDomNode[] => {
  return [parentNode, text(EditorStrings.noSuggestions())]
}
