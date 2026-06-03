import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleCompletionItem } from '../VisibleCompletionItem/VisibleCompletionItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetCompletionItemIconVirtualDom from '../GetCompletionItemIconVirtualDom/GetCompletionItemIconVirtualDom.ts'
import * as GetHighlightedLabelDom from '../GetHighlightedLabelDom/GetHighlightedLabelDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getCompletionItemClassName = (focused: boolean, deprecated: boolean): string => {
  if (focused && deprecated) {
    return MergeClassNames.mergeClassNames(
      ClassNames.EditorCompletionItem,
      ClassNames.EditorCompletionItemFocused,
      ClassNames.EditorCompletionItemDeprecated,
    )
  }
  if (focused) {
    return MergeClassNames.mergeClassNames(ClassNames.EditorCompletionItem, ClassNames.EditorCompletionItemFocused)
  }
  if (deprecated) {
    return MergeClassNames.mergeClassNames(ClassNames.EditorCompletionItem, ClassNames.EditorCompletionItemDeprecated)
  }
  return ClassNames.EditorCompletionItem
}

export const getCompletionItemVirtualDom = (visibleItem: VisibleCompletionItem): readonly VirtualDomNode[] => {
  const { deprecated, fileIcon, focused, highlights, label, symbolName, top } = visibleItem
  const className = getCompletionItemClassName(focused, deprecated)
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
