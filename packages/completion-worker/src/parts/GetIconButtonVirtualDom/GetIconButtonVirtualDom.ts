import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getIconButtonClassName = (disabled: boolean): string => {
  if (disabled) {
    return MergeClassNames.mergeClassNames(ClassNames.IconButton, ClassNames.IconButtonDisabled)
  }
  return ClassNames.IconButton
}

export const getIconButtonVirtualDom = (iconButton: any) => {
  const { disabled, icon, label, name, onClick } = iconButton
  const className = getIconButtonClassName(disabled)
  return [
    {
      ariaLabel: label,
      childCount: 1,
      className,
      disabled: disabled ? true : undefined,
      name: name,
      onClick: onClick,
      title: label,
      type: VirtualDomElements.Button,
    },
    GetIconVirtualDom.getIconVirtualDom(icon),
  ]
}
