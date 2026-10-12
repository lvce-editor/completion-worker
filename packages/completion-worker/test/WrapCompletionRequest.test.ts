import { expect, test } from '@jest/globals'
import * as CompletionStates from '../src/parts/CompletionStates/CompletionStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { wrapCompletionRequest } from '../src/parts/WrapCompletionRequest/WrapCompletionRequest.ts'

test('newest completion request wins when responses arrive out of order', async () => {
  const state = createDefaultState('test-application')
  const { uid } = state
  CompletionStates.set(uid, state, state)
  const first = Promise.withResolvers<void>()
  const second = Promise.withResolvers<void>()
  const request = wrapCompletionRequest(async (snapshot, label: string, ready: Readonly<Promise<void>>) => {
    await ready
    return { ...snapshot, items: [{ flags: 0, kind: 1, label }] }
  })
  const older = request(uid, 'older', first.promise)
  const newer = request(uid, 'newer', second.promise)
  second.resolve()
  await newer
  first.resolve()
  await older
  expect(CompletionStates.get(uid).newState.items.map((item) => item.label)).toEqual(['newer'])
  expect(CompletionStates.get(uid).oldState).toBe(state)
  CompletionStates.dispose(uid)
})

test('disposal during a pending request cannot recreate completion state', async () => {
  const state = createDefaultState('test-application')
  const { uid } = state
  CompletionStates.set(uid, state, state)
  const ready = Promise.withResolvers<void>()
  let calls = 0
  const request = wrapCompletionRequest(async (snapshot) => {
    calls++
    await ready.promise
    return snapshot
  })
  const pending = request(uid)
  CompletionStates.dispose(uid)
  ready.resolve()
  await pending
  await request(uid)
  expect(CompletionStates.get(uid)).toBeUndefined()
  expect(calls).toBe(1)
})
