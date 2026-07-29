import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const completionDetailNode: VirtualDomNode = {
  childCount: 2,
  className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.EditorCompletionDetails),
  type: VirtualDomElements.Div,
}

const completionDetailContentNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.CompletionDetailContent,
  type: VirtualDomElements.Div,
}

const completionDetailCloseButtonNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.CompletionDetailCloseButton,
  onClick: DomEventListenerFunctions.HandleClose,
  role: AriaRoles.Button,
  type: VirtualDomElements.Div,
}

const completionDetailCloseIconNode: VirtualDomNode = {
  childCount: 0,
  className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.IconClose),
  type: VirtualDomElements.Div,
}

export const getCompletionDetailVirtualDom = (content: string): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    completionDetailNode,
    completionDetailContentNode,
    text(content),
    completionDetailCloseButtonNode,
    completionDetailCloseIconNode,
  ]
  return dom
}
