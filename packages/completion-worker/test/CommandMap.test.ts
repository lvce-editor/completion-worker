import { expect, test } from '@jest/globals'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.ts'

test('commandMap', () => {
  expect(typeof CommandMap.commandMap).toBe('object')
})

test('commandMap contains focusLast', () => {
  expect(CommandMap.commandMap).toHaveProperty(['Completions.focusLast'])
})
