import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleCompletionItem } from '../VisibleCompletionItem/VisibleCompletionItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import * as GetCompletionItemsVirtualDom from '../GetCompletionItemsVirtualDom/GetCompletionItemsVirtualDom.ts'
import * as GetScrollBarVirtualDom from '../GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as Ids from '../Ids/Ids.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getCompletionVirtualDom = (
  visibleItems: readonly VisibleCompletionItem[],
  scrollBarHeight: number,
  scrollBarTop: number,
): readonly VirtualDomNode[] => {
  const scrollBarDom = GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarTop)
  const childCount = scrollBarDom.length === 0 ? 1 : 2
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.EditorCompletion),
      id: Ids.Completions,
      childCount: childCount,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ListItems,
      role: AriaRoles.ListBox,
      ariaLabel: EditorStrings.suggest(),
      childCount: 1,
      onWheel: DomEventListenerFunctions.HandleWheel,
    },
    ...GetCompletionItemsVirtualDom.getCompletionItemsVirtualDom(visibleItems),
    ...scrollBarDom,
    // TODO render scrollbar
  ]
}
