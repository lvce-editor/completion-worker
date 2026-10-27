import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-home-after-end-accepts-first'
export const test = createCompletionTest({ initialText: '', keys: ['End', 'Home'], expectedFocusedItem: 'alpha', acceptedText: 'alpha' })
