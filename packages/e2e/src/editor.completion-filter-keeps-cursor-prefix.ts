import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-filter-keeps-cursor-prefix'
export const test = createCompletionTest({ initialText: 'alph', cursor: 2, expectedItems: ['alpha'], acceptedText: 'alpha' })
