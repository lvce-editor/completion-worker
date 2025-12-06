import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleCompletionItem } from '../src/parts/VisibleCompletionItem/VisibleCompletionItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as EditorStrings from '../src/parts/EditorStrings/EditorStrings.ts'
import { getCompletionVirtualDom } from '../src/parts/GetCompletionVirtualDom/GetCompletionVirtualDom.ts'
import * as Ids from '../src/parts/Ids/Ids.ts'

test('getCompletionVirtualDom returns correct structure with scrollbar', () => {
  const visibleItems: readonly VisibleCompletionItem[] = [
    {
      deprecated: false,
      fileIcon: '',
      focused: false,
      highlights: [0, 2, 2, 4], // [start1, end1, start2, end2]
      label: 'test',
      symbolName: 'test',
      top: 0,
    },
  ]
  const result = getCompletionVirtualDom(visibleItems, 100, 0)
  expect(result[0]).toEqual({
    childCount: 2,
    className: expect.any(String),
    id: Ids.Completions,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    ariaLabel: EditorStrings.suggest(),
    childCount: 1,
    className: ClassNames.ListItems,
    onWheel: DomEventListenerFunctions.HandleWheel,
    role: AriaRoles.ListBox,
    type: VirtualDomElements.Div,
  })
})

test('getCompletionVirtualDom returns correct structure without scrollbar', () => {
  const visibleItems: readonly VisibleCompletionItem[] = [
    {
      deprecated: false,
      fileIcon: '',
      focused: false,
      highlights: [0, 2, 2, 4], // [start1, end1, start2, end2]
      label: 'test',
      symbolName: 'test',
      top: 0,
    },
  ]
  const result = getCompletionVirtualDom(visibleItems, 0, 0)
  expect(result[0]).toEqual({
    childCount: 1,
    className: expect.any(String),
    id: Ids.Completions,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    ariaLabel: EditorStrings.suggest(),
    childCount: 1,
    className: ClassNames.ListItems,
    onWheel: DomEventListenerFunctions.HandleWheel,
    role: AriaRoles.ListBox,
    type: VirtualDomElements.Div,
  })
})
