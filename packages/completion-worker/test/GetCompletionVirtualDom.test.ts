import { test, expect } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getCompletionVirtualDom } from '../src/parts/GetCompletionVirtualDom/GetCompletionVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test.skip('getCompletionVirtualDom creates correct structure with empty items', () => {
  const result = getCompletionVirtualDom([], 0, 0)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: expect.stringContaining(ClassNames.Viewlet),
    id: 'Completions',
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: 'ListItems',
    role: 'listbox',
    ariaLabel: 'Suggest',
    childCount: 1,
  })
})

test.skip('getCompletionVirtualDom creates correct structure with items', () => {
  const mockItems = [
    { label: 'item1', kind: 'function' },
    { label: 'item2', kind: 'variable' },
  ] as any
  const result = getCompletionVirtualDom(mockItems, 0, 0)
  expect(result).toHaveLength(4) // 2 container divs + 1 root div + items
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: expect.stringContaining(ClassNames.Viewlet),
    id: 'Completions',
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: 'ListItems',
    role: 'listbox',
    ariaLabel: 'Suggest',
    childCount: 1,
  })
})
