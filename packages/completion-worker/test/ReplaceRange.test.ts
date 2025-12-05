import { expect, test } from '@jest/globals'
import { replaceRange } from '../src/parts/ReplaceRange/ReplaceRange.ts'

test('replaceRange - single line replacement', () => {
  const lines = ['hello world']
  const ranges = new Uint32Array([0, 0, 0, 5]) // replace 'hello'
  const replacement = ['hi']
  const origin = 'test'

  const changes = replaceRange(lines, ranges, replacement, origin)

  expect(changes).toHaveLength(1)
  expect(changes[0]).toEqual({
    deleted: ['hello'],
    end: { columnIndex: 5, rowIndex: 0 },
    inserted: ['hi'],
    origin: 'test',
    start: { columnIndex: 0, rowIndex: 0 },
  })
})

test('replaceRange - multi line replacement', () => {
  const lines = ['hello', 'world']
  const ranges = new Uint32Array([0, 0, 1, 5]) // replace entire content
  const replacement = ['hi', 'there']
  const origin = 'test'

  const changes = replaceRange(lines, ranges, replacement, origin)

  expect(changes).toHaveLength(1)
  expect(changes[0]).toEqual({
    deleted: ['hello', 'world'],
    end: { columnIndex: 5, rowIndex: 1 },
    inserted: ['hi', 'there'],
    origin: 'test',
    start: { columnIndex: 0, rowIndex: 0 },
  })
})

test('replaceRange - multiple selections', () => {
  const lines = ['hello world']
  const ranges = new Uint32Array([
    0,
    0,
    0,
    5, // first selection: 'hello'
    0,
    6,
    0,
    11, // second selection: 'world'
  ])
  const replacement = ['hi']
  const origin = 'test'

  const changes = replaceRange(lines, ranges, replacement, origin)

  expect(changes).toHaveLength(2)
  expect(changes[0]).toEqual({
    deleted: ['hello'],
    end: { columnIndex: 5, rowIndex: 0 },
    inserted: ['hi'],
    origin: 'test',
    start: { columnIndex: 0, rowIndex: 0 },
  })
  expect(changes[1]).toEqual({
    deleted: ['world'],
    end: { columnIndex: 11, rowIndex: 0 },
    inserted: ['hi'],
    origin: 'test',
    start: { columnIndex: 6, rowIndex: 0 },
  })
})
