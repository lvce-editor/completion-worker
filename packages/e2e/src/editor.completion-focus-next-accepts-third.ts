import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-focus-next-accepts-third'
export const test = createCompletionTest({ initialText: '', keys: ['ArrowDown', 'ArrowDown'], expectedFocusedItem: 'gamma', acceptedText: 'gamma' })
