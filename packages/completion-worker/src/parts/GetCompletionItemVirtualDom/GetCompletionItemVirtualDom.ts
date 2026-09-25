import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleCompletionItem } from '../VisibleCompletionItem/VisibleCompletionItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as GetCompletionItemClassName from '../GetCompletionItemClassName/GetCompletionItemClassName.ts'
import * as GetCompletionItemIconVirtualDom from '../GetCompletionItemIconVirtualDom/GetCompletionItemIconVirtualDom.ts'
import * as GetHighlightedLabelDom from '../GetHighlightedLabelDom/GetHighlightedLabelDom.ts'

export const getCompletionItemVirtualDom = (visibleItem: VisibleCompletionItem): readonly VirtualDomNode[] => {
  const { deprecated, fileIcon, focused, highlights, label, symbolName, top } = visibleItem
  const className = GetCompletionItemClassName.getCompletionItemClassName(focused, deprecated)
  return [
    {
      childCount: 2,
      className,
      role: AriaRoles.Option,
      top,
      type: VirtualDomElements.Div,
    },
    GetCompletionItemIconVirtualDom.getIconDom(fileIcon, symbolName),
    ...GetHighlightedLabelDom.getHighlightedLabelDom(label, highlights),
  ]
}
