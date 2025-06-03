import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleCompletionItem } from '../VisibleCompletionItem/VisibleCompletionItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import * as GetCompletionItemsVirtualDom from '../GetCompletionItemsVirtualDom/GetCompletionItemsVirtualDom.ts'
import * as Ids from '../Ids/Ids.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getCompletionVirtualDom = (visibleItems: readonly VisibleCompletionItem[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.EditorCompletion),
      id: Ids.Completions,
      childCount: 1,
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
    // ...GetScrollBarVirtualDom.getScrollBarVirtualDom(scr),
    // TODO render scrollbar
  ]
}
