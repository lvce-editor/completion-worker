import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-filter-gamma-prefix'
export const test = createCompletionTest({ initialText: 'ga', expectedItems: ['gamma'], acceptedText: 'gamma' })
