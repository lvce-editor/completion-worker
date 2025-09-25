import { expect, test } from '@jest/globals'
import { getIndexFromPosition } from '../src/parts/GetIndexFromPosition/GetIndexFromPosition.js'

test('getIndexFromPosition - basic functionality', () => {
  const y = 100
  const clientY = 150
  const itemHeight = 20
  const result = getIndexFromPosition(y, clientY, itemHeight)
  expect(result).toBe(2)
})

test('getIndexFromPosition - click on first item', () => {
  const y = 100
  const clientY = 110
  const itemHeight = 20
  const result = getIndexFromPosition(y, clientY, itemHeight)
  expect(result).toBe(0)
})

test('getIndexFromPosition - click on second item', () => {
  const y = 100
  const clientY = 130
  const itemHeight = 20
  const result = getIndexFromPosition(y, clientY, itemHeight)
  expect(result).toBe(1)
})

test('getIndexFromPosition - click on third item', () => {
  const y = 100
  const clientY = 150
  const itemHeight = 20
  const result = getIndexFromPosition(y, clientY, itemHeight)
  expect(result).toBe(2)
})

test('getIndexFromPosition - click before first item', () => {
  const y = 100
  const clientY = 90
  const itemHeight = 20
  const result = getIndexFromPosition(y, clientY, itemHeight)
  expect(result).toBe(-1)
})

test('getIndexFromPosition - click exactly on boundary', () => {
  const y = 100
  const clientY = 100
  const itemHeight = 20
  const result = getIndexFromPosition(y, clientY, itemHeight)
  expect(result).toBe(0)
})

test('getIndexFromPosition - click near end of item', () => {
  const y = 100
  const clientY = 119
  const itemHeight = 20
  const result = getIndexFromPosition(y, clientY, itemHeight)
  expect(result).toBe(0)
})

test('getIndexFromPosition - different item heights', () => {
  const y = 50
  const clientY = 100
  const itemHeight = 10
  const result = getIndexFromPosition(y, clientY, itemHeight)
  expect(result).toBe(5)
})

test('getIndexFromPosition - fractional result should floor', () => {
  const y = 100
  const clientY = 125
  const itemHeight = 20
  const result = getIndexFromPosition(y, clientY, itemHeight)
  expect(result).toBe(1)
})
