import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-focus-next-accepts-second'
export const test = createCompletionTest({ initialText: '', keys: ['ArrowDown'], expectedFocusedItem: 'beta', acceptedText: 'beta' })
