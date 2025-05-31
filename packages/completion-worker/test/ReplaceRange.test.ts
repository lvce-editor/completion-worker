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
    start: { rowIndex: 0, columnIndex: 0 },
    end: { rowIndex: 0, columnIndex: 5 },
    inserted: ['hi'],
    deleted: ['hello'],
    origin: 'test',
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
    start: { rowIndex: 0, columnIndex: 0 },
    end: { rowIndex: 1, columnIndex: 5 },
    inserted: ['hi', 'there'],
    deleted: ['hello', 'world'],
    origin: 'test',
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
    start: { rowIndex: 0, columnIndex: 0 },
    end: { rowIndex: 0, columnIndex: 5 },
    inserted: ['hi'],
    deleted: ['hello'],
    origin: 'test',
  })
  expect(changes[1]).toEqual({
    start: { rowIndex: 0, columnIndex: 6 },
    end: { rowIndex: 0, columnIndex: 11 },
    inserted: ['hi'],
    deleted: ['world'],
    origin: 'test',
  })
})
