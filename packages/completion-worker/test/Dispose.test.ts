import { expect, test } from '@jest/globals'
import * as CompletionStates from '../src/parts/CompletionStates/CompletionStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { dispose } from '../src/parts/Dispose/Dispose.ts'

test('dispose', async () => {
  const state = createDefaultState()
  CompletionStates.set(123, state, state)
  dispose(123)
  expect(CompletionStates.get(123)).toBeUndefined()
})
