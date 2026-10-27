import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-replaces-suffix-after-cursor'
export const test = createCompletionTest({ initialText: 'alphx', cursor: 4, expectedItems: ['alpha'], acceptedText: 'alpha' })
