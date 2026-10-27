import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-navigation-does-not-change-document'
export const test = createCompletionTest({ initialText: 'al', keys: ['ArrowDown', 'ArrowDown'], expectedItems: ['alpha'], close: true })
