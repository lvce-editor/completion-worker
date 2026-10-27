import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-home-next-accepts-second'
export const test = createCompletionTest({ initialText: '', keys: ['Home', 'ArrowDown'], expectedFocusedItem: 'beta', acceptedText: 'beta' })
