import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-filter-beta-inside-line'
export const test = createCompletionTest({ initialText: 'bexx', cursor: 2, expectedItems: ['beta'], acceptedText: 'beta' })
