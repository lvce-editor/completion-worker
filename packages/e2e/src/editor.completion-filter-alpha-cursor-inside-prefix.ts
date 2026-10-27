import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-filter-alpha-cursor-inside-prefix'
export const test = createCompletionTest({ initialText: 'alpha', cursor: 2, expectedItems: ['alpha'], acceptedText: 'alpha' })
