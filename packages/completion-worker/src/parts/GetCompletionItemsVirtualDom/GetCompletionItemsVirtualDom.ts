import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleCompletionItem } from '../VisibleCompletionItem/VisibleCompletionItem.ts'
import * as GetCompletionItemVirtualDom from '../GetCompletionItemVirtualDom/GetCompletionItemVirtualDom.ts'
import * as GetNoResultsVirtualDom from '../GetNoResultsVirtualDom/GetNoResultsVirtualDom.ts'

export const getCompletionItemsVirtualDom = (visibleItems: readonly VisibleCompletionItem[]): readonly VirtualDomNode[] => {
  if (visibleItems.length === 0) {
    return GetNoResultsVirtualDom.getNoResultsVirtualDom()
  }
  return [
    {
      childCount: visibleItems.length,
      type: VirtualDomElements.Div,
    },
    ...visibleItems.flatMap(GetCompletionItemVirtualDom.getCompletionItemVirtualDom),
  ]
}
