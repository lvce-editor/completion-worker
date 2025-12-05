import { test, expect } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import * as EditorCompletionMap from '../src/parts/EditorCompletionMap/EditorCompletionMap.ts'
import * as GetCompletionFileIcon from '../src/parts/GetCompletionFileIcon/GetCompletionFileIcon.ts'
import * as GetCompletionItemHighlights from '../src/parts/GetCompletionItemHighlights/GetCompletionItemHighlights.ts'
import { getVisibleItems } from '../src/parts/GetVisibleCompletionItems/GetVisibleCompletionItems.ts'

test('getVisibleItems transforms completion items correctly', () => {
  const filteredItems: CompletionItem[] = [
    {
      flags: 0,
      kind: 1,
      label: 'test1',
      matches: [0, 4],
    },
    {
      flags: 0,
      kind: 1,
      label: 'test2',
      matches: [0, 4],
    },
  ]

  const itemHeight = 20
  const leadingWord = 'test'
  const minLineY = 0
  const maxLineY = 2
  const focusedIndex = 0

  const result = getVisibleItems(filteredItems, itemHeight, leadingWord, minLineY, maxLineY, focusedIndex, 0)

  expect(result).toEqual([
    {
      deprecated: 0,
      fileIcon: GetCompletionFileIcon.getCompletionFileIcon(1),
      focused: true,
      highlights: GetCompletionItemHighlights.getHighlights(filteredItems[0]),
      label: 'test1',
      symbolName: EditorCompletionMap.getSymbolName(1),
      top: 0,
    },
    {
      deprecated: 0,
      fileIcon: GetCompletionFileIcon.getCompletionFileIcon(1),
      focused: false,
      highlights: GetCompletionItemHighlights.getHighlights(filteredItems[1]),
      label: 'test2',
      symbolName: EditorCompletionMap.getSymbolName(1),
      top: 20,
    },
  ])
})

test('getVisibleItems handles empty array', () => {
  const result = getVisibleItems([], 20, 'test', 0, 0, 0, 0)

  expect(result).toHaveLength(0)
})

test('getVisibleItems handles different focused index', () => {
  const filteredItems: CompletionItem[] = [
    {
      flags: 0,
      kind: 1,
      label: 'test1',
      matches: [0, 4],
    },
    {
      flags: 0,
      kind: 1,
      label: 'test2',
      matches: [0, 4],
    },
  ]

  const result = getVisibleItems(filteredItems, 20, 'test', 0, 2, 1, 0)

  expect(result).toEqual([
    {
      deprecated: 0,
      fileIcon: GetCompletionFileIcon.getCompletionFileIcon(1),
      focused: false,
      highlights: GetCompletionItemHighlights.getHighlights(filteredItems[0]),
      label: 'test1',
      symbolName: EditorCompletionMap.getSymbolName(1),
      top: 0,
    },
    {
      deprecated: 0,
      fileIcon: GetCompletionFileIcon.getCompletionFileIcon(1),
      focused: true,
      highlights: GetCompletionItemHighlights.getHighlights(filteredItems[1]),
      label: 'test2',
      symbolName: EditorCompletionMap.getSymbolName(1),
      top: 20,
    },
  ])
})
