import { expect, test } from '@jest/globals'
import { noResults, noSuggestions, suggest } from '../src/parts/EditorStrings/EditorStrings.ts'

test('noResults returns string', () => {
  const result = noResults()
  expect(result).toBe('No Results')
})

test('noSuggestions returns string', () => {
  const result = noSuggestions()
  expect(result).toBe('No Suggestions')
})

test('suggest returns string', () => {
  const result = suggest()
  expect(result).toBe('Suggest')
})
