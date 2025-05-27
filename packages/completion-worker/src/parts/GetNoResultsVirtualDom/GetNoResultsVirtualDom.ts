import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getNoResultsVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      childCount: 1,
    },
    text(EditorStrings.noResults()),
  ]
}
