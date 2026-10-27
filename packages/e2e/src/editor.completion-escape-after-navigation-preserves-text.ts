import { createCompletionTest } from './helpers/createCompletionTest.ts'
export const name = 'editor.completion-escape-after-navigation-preserves-text'
export const test = createCompletionTest({ initialText: 'al', keys: ['ArrowDown'], expectedItems: ['alpha'], close: true })
