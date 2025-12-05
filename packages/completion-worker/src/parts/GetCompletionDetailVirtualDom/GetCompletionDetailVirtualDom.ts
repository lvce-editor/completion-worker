import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getCompletionDetailVirtualDom = (content: string): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 2,
      className: 'Viewlet EditorCompletionDetails',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.CompletionDetailContent,
      type: VirtualDomElements.Div,
    },
    text(content),
    {
      childCount: 1,
      className: ClassNames.CompletionDetailCloseButton,
      onClick: DomEventListenerFunctions.HandleClose,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.MaskIcon} ${ClassNames.IconClose}`,
      type: VirtualDomElements.Div,
    },
  ]
  return dom
}
