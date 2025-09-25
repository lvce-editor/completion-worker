import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'

export const getIconVirtualDom = (icon: string, type = VirtualDomElements.Div) => {
  return {
    type,
    className: `MaskIcon MaskIcon${icon}`,
    role: AriaRoles.None,
    childCount: 0,
  }
}
