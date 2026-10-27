import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-filter-prefix-after-dismiss-and-reopen'
export const test = createCompletionTest({ initialText: 'ga', expectedItems: ['gamma'], close: true, reopen: true })
