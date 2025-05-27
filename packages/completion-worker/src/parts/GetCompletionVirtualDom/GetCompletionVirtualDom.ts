import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetCompletionItemsVirtualDom from '../GetCompletionItemsVirtualDom/GetCompletionItemsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getCompletionVirtualDom = (visibleItems: readonly any[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.EditorCompletionItem),
      childCount: 1,
    },
    ...GetCompletionItemsVirtualDom.getCompletionItemsVirtualDom(visibleItems),
  ]
}
