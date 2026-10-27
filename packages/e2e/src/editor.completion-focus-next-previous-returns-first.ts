import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-focus-next-previous-returns-first'
export const test = createCompletionTest({ initialText: '', keys: ['ArrowDown', 'ArrowUp'], expectedFocusedItem: 'alpha', acceptedText: 'alpha' })
