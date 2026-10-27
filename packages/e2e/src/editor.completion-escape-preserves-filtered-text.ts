import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-escape-preserves-filtered-text'
export const test = createCompletionTest({ initialText: 'be', expectedItems: ['beta'], close: true })
