import { test, expect } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getScrollBarVirtualDom } from '../src/parts/GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('should return empty array when scrollBarHeight is 0', () => {
  const result = getScrollBarVirtualDom(0, 0)
  expect(result).toEqual([])
})

test('should return scrollbar virtual dom when scrollBarHeight is greater than 0', () => {
  const result = getScrollBarVirtualDom(100, 50)
  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.ScrollBar} ${ClassNames.ScrollBarSmall}`,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ScrollBarThumb,
      childCount: 0,
      height: '100px',
      translate: '0px 50px',
    },
  ])
})
