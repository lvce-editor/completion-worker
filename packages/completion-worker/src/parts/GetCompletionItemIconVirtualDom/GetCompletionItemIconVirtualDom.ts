import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getIconDom = (fileIcon: string, symbolName: string): VirtualDomNode => {
  if (fileIcon) {
    return GetFileIconVirtualDom.getFileIconVirtualDom(fileIcon)
  }
  return {
    type: VirtualDomElements.Div,
    className: `${ClassNames.ColoredMaskIcon} ${symbolName}`,
    childCount: 0,
  }
}
