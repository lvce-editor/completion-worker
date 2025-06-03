import { test, expect } from '@jest/globals'
import type { CompletionItem } from '../src/parts/CompletionItem/CompletionItem.ts'
import * as EditorCompletionMap from '../src/parts/EditorCompletionMap/EditorCompletionMap.ts'
import * as GetCompletionFileIcon from '../src/parts/GetCompletionFileIcon/GetCompletionFileIcon.ts'
import * as GetCompletionItemHighlights from '../src/parts/GetCompletionItemHighlights/GetCompletionItemHighlights.ts'
import { getVisibleItems } from '../src/parts/GetVisibleCompletionItems/GetVisibleCompletionItems.ts'

test('getVisibleItems transforms completion items correctly', () => {
  const filteredItems: CompletionItem[] = [
    {
      label: 'test1',
      kind: 1,
      flags: 0,
      matches: [0, 4],
    },
    {
      label: 'test2',
      kind: 1,
      flags: 0,
      matches: [0, 4],
    },
  ]

  const itemHeight = 20
  const leadingWord = 'test'
  const minLineY = 0
  const maxLineY = 2
  const focusedIndex = 0

  const result = getVisibleItems(filteredItems, itemHeight, leadingWord, minLineY, maxLineY, focusedIndex, 0)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    label: 'test1',
    symbolName: EditorCompletionMap.getSymbolName(1),
    top: 0,
    highlights: GetCompletionItemHighlights.getHighlights(filteredItems[0]),
    focused: true,
    deprecated: 0,
    fileIcon: GetCompletionFileIcon.getCompletionFileIcon(1),
  })
  expect(result[1]).toEqual({
    label: 'test2',
    symbolName: EditorCompletionMap.getSymbolName(1),
    top: 20,
    highlights: GetCompletionItemHighlights.getHighlights(filteredItems[1]),
    focused: false,
    deprecated: 0,
    fileIcon: GetCompletionFileIcon.getCompletionFileIcon(1),
  })
})

test('getVisibleItems handles empty array', () => {
  const result = getVisibleItems([], 20, 'test', 0, 0, 0, 0)

  expect(result).toHaveLength(0)
})

test('getVisibleItems handles different focused index', () => {
  const filteredItems: CompletionItem[] = [
    {
      label: 'test1',
      kind: 1,
      flags: 0,
      matches: [0, 4],
    },
    {
      label: 'test2',
      kind: 1,
      flags: 0,
      matches: [0, 4],
    },
  ]

  const result = getVisibleItems(filteredItems, 20, 'test', 0, 2, 1, 0)

  expect(result[0].focused).toBe(false)
  expect(result[1].focused).toBe(true)
})
