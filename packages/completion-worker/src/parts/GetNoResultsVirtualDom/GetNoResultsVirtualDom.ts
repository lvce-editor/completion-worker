import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const parentNode: VirtualDomNode = {
  type: VirtualDomElements.Div,
  childCount: 1,
}

export const getNoResultsVirtualDom = (): readonly VirtualDomNode[] => {
  return [parentNode, text(EditorStrings.noSuggestions())]
}
