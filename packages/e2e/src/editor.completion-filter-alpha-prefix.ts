import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-filter-alpha-prefix'
export const test = createCompletionTest({ initialText: 'al', expectedItems: ['alpha'] })
