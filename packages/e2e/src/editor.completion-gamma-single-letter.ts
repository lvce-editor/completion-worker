import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-gamma-single-letter'
export const test = createCompletionTest({ initialText: 'g', expectedItems: ['gamma'] })
