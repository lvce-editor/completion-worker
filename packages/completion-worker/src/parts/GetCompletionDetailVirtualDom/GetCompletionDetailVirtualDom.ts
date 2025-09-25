import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getCompletionDetailVirtualDom = (content: string): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: 'Viewlet EditorCompletionDetails',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.CompletionDetailContent,
      childCount: 1,
    },
    text(content),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.CompletionDetailCloseButton,
      onClick: DomEventListenerFunctions.HandleClose,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.MaskIcon} ${ClassNames.IconClose}`,
      childCount: 0,
    },
  ]
  return dom
}
