import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import * as GetCompletionItemsVirtualDom from '../GetCompletionItemsVirtualDom/GetCompletionItemsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getCompletionVirtualDom = (visibleItems: readonly any[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.EditorCompletion),
      id: 'Completions',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ListItems,
      role: AriaRoles.ListBox,
      ariaLabel: EditorStrings.suggest(),
      childCount: 1,
    },
    ...GetCompletionItemsVirtualDom.getCompletionItemsVirtualDom(visibleItems),

    // TODO render scrollbar
  ]
}
