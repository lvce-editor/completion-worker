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

test('create requires an application id', () => {
  expect(() => create(1, 0, 0, 0, 0, 2, 'typescript', undefined as unknown as string)).toThrow('applicationId is required')
})
