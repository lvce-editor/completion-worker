import { expect, test } from '@jest/globals'
import * as FindWidgetStates from '../src/parts/CompletionStates/CompletionStates.js'
import { create } from '../src/parts/Create/Create.js'

test('create - creates and sets completion state', () => {
  const uid = 1
  const x = 100
  const y = 200
  const width = 300
  const height = 400
  const editorUid = 2
  const editorLanguageId = 'typescript'
  create(uid, x, y, width, height, editorUid, editorLanguageId, 'test-application')
  expect(FindWidgetStates.get(uid)?.newState.applicationId).toBe('test-application')
})

test('create retains an undefined application id for global completion providers', () => {
  create(2, 0, 0, 0, 0, 3, 'typescript', undefined)
  expect(FindWidgetStates.get(2)?.newState).toHaveProperty('applicationId', undefined)
})

test('create rejects non-string application ids', () => {
  expect(() => create(3, 0, 0, 0, 0, 4, 'typescript', 123 as unknown as string)).toThrow('applicationId must be a string when provided')
})
