import { test, expect } from '@jest/globals'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize resolves', async () => {
  await expect(initialize()).resolves.toBeUndefined()
})
