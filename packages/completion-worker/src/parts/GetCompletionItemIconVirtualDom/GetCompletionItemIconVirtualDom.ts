import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'

export const getIconDom = (fileIcon: string, symbolName: string): VirtualDomNode => {
  if (fileIcon) {
    return GetFileIconVirtualDom.getFileIconVirtualDom(fileIcon)
  }
  return {
    childCount: 0,
    className: `${ClassNames.ColoredMaskIcon} ${symbolName}`,
    type: VirtualDomElements.Div,
  }
}
