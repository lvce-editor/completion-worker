import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-end-accepts-last'
export const test = createCompletionTest({ initialText: '', keys: ['End'], expectedFocusedItem: 'gamma', acceptedText: 'gamma' })
