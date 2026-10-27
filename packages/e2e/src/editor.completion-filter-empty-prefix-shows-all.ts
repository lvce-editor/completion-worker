import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-filter-empty-prefix-shows-all'
export const test = createCompletionTest({ initialText: ' ', expectedItems: ['alpha', 'beta', 'gamma'] })
