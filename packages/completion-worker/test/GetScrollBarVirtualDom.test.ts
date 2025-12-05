import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getScrollBarVirtualDom } from '../src/parts/GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'

test('should return empty array when scrollBarHeight is 0', () => {
  const result = getScrollBarVirtualDom(0, 0)
  expect(result).toEqual([])
})

test('should return scrollbar virtual dom when scrollBarHeight is greater than 0', () => {
  const result = getScrollBarVirtualDom(100, 50)
  expect(result).toEqual([
    {
      childCount: 1,
      className: `${ClassNames.ScrollBar} ${ClassNames.ScrollBarSmall}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.ScrollBarThumb,
      height: '100px',
      translate: '0px 50px',
      type: VirtualDomElements.Div,
    },
  ])
})
