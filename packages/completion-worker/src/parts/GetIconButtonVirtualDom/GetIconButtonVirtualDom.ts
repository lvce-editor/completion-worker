import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'

export const getIconButtonVirtualDom = (iconButton: any) => {
  const { label, icon, disabled, name, onClick } = iconButton
  let className = ClassNames.IconButton
  if (disabled) {
    className += ' ' + ClassNames.IconButtonDisabled
  }
  return [
    {
      type: VirtualDomElements.Button,
      className,
      title: label,
      ariaLabel: label,
      childCount: 1,
      disabled: disabled ? true : undefined,
      onClick: onClick,
      name: name,
    },
    GetIconVirtualDom.getIconVirtualDom(icon),
  ]
}
