import { expect, test } from '@jest/globals'
import type { VisibleCompletionItem } from '../src/parts/VisibleCompletionItem/VisibleCompletionItem.ts'
import * as GetCompletionItemsVirtualDom from '../src/parts/GetCompletionItemsVirtualDom/GetCompletionItemsVirtualDom.ts'

test('getCompletionItemsVirtualDom - empty', () => {
  const visibleItems: VisibleCompletionItem[] = []
  expect(GetCompletionItemsVirtualDom.getCompletionItemsVirtualDom(visibleItems)).toEqual([
    {
      childCount: 1,
      type: 4,
    },
    {
      childCount: 0,
      text: 'No Suggestions',
      type: 12,
    },
  ])
})

test('getCompletionItemsVirtualDom', () => {
  const visibleItems: VisibleCompletionItem[] = [
    {
      deprecated: true,
      fileIcon: '',
      focused: true,
      highlights: [],
      label: 'test',
      symbolName: 'test',
      top: 0,
    },
  ]
  expect(GetCompletionItemsVirtualDom.getCompletionItemsVirtualDom(visibleItems)).toEqual([
    {
      childCount: 1,
      type: 4,
    },
    {
      childCount: 2,
      className: 'EditorCompletionItem EditorCompletionItemFocused EditorCompletionItemDeprecated',
      role: 'option',
      top: 0,
      type: 4,
    },
    {
      childCount: 0,
      className: 'ColoredMaskIcon test',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Label',
      type: 4,
    },
    {
      childCount: 0,
      text: 'test',
      type: 12,
    },
  ])
})
