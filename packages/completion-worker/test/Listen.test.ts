import { beforeEach, expect, jest, test } from '@jest/globals'

const WebWorkerRpcClient = {
  create: jest.fn(),
}

const MessagePortRpcParent = {
  create: jest.fn(),
}

jest.unstable_mockModule('@lvce-editor/rpc', () => {
  return {
    WebWorkerRpcClient,
    MessagePortRpcParent,
  }
})

const Listen = await import('../src/parts/Listen/Listen.ts')

beforeEach(async () => {
  jest.resetModules()
})

test('listen', async () => {
  await Listen.listen()
  expect(WebWorkerRpcClient.create).toHaveBeenCalledTimes(1)
})

test('error case', async () => {
  // @ts-ignore
  WebWorkerRpcClient.create.mockRejectedValue(new Error('test error'))
  await expect(Listen.listen()).rejects.toThrow('test error')
})
