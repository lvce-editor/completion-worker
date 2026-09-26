import { expect, test } from '@jest/globals'
import { getCompletionItemClassName } from '../src/parts/GetCompletionItemClassName/GetCompletionItemClassName.ts'

test.each([
  [false, false, 'EditorCompletionItem'],
  [true, false, 'EditorCompletionItem EditorCompletionItemFocused'],
  [false, true, 'EditorCompletionItem EditorCompletionItemDeprecated'],
  [true, true, 'EditorCompletionItem EditorCompletionItemFocused EditorCompletionItemDeprecated'],
])('returns the expected class names for focused=%s and deprecated=%s', (focused, deprecated, expected) => {
  expect(getCompletionItemClassName(focused, deprecated)).toBe(expected)
})
