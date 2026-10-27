import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-filter-beta-prefix'
export const test = createCompletionTest({ initialText: 'be', expectedItems: ['beta'], acceptedText: 'beta' })
