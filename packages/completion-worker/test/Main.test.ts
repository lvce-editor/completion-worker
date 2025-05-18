import { beforeEach, expect, jest, test } from '@jest/globals'

const Listen = {
  listen: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Listen/Listen.ts', () => Listen)

const Main = await import('../src/parts/Main/Main.ts')

beforeEach(() => {
  Listen.listen.mockReset()
})

test('main', async () => {
  await Main.main()
  expect(Listen.listen).toHaveBeenCalledTimes(1)
})

test('error case', async () => {
  // @ts-ignore
  Listen.listen.mockRejectedValue(new Error('test error'))
  await expect(Main.main()).rejects.toThrow('test error')
})
