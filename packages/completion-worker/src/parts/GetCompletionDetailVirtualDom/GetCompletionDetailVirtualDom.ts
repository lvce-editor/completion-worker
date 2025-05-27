import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCompletionDetailVirtualDom = (content: string): readonly VirtualDomNode[] => {
  const dom: any[] = [
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
