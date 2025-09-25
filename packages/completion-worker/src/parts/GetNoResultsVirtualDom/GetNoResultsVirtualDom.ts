import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import { text } from '@lvce-editor/virtual-dom-worker'

const parentNode: VirtualDomNode = {
  type: VirtualDomElements.Div,
  childCount: 1,
}

export const getNoResultsVirtualDom = (): readonly VirtualDomNode[] => {
  return [parentNode, text(EditorStrings.noSuggestions())]
}
