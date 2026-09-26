import { expect, test } from '@jest/globals'
import { getCompletionHorizontalBounds } from '../src/parts/GetCompletionHorizontalBounds/GetCompletionHorizontalBounds.ts'

const items = [{ flags: 0, kind: 1, label: 'window.titleBarStyle', matches: [] }]

test('keeps the content width when there is space to the right', () => {
  expect(getCompletionHorizontalBounds(items, 320, 300, 800)).toEqual({ width: 273, x: 320 })
})

test('shifts left at the right edge instead of clipping a label that fits the pane', () => {
  expect(getCompletionHorizontalBounds(items, 1050, 300, 800)).toEqual({ width: 273, x: 827 })
})

test('fits a pane narrower than the usual minimum width', () => {
  expect(getCompletionHorizontalBounds(items, 400, 300, 180)).toEqual({ width: 180, x: 300 })
  expect(getCompletionHorizontalBounds([], 400, 300, 180)).toEqual({ width: 180, x: 300 })
})

test('clamps an offscreen cursor and handles a collapsed pane', () => {
  expect(getCompletionHorizontalBounds(items, 200, 300, 800)).toEqual({ width: 273, x: 300 })
  expect(getCompletionHorizontalBounds(items, 400, 300, 0)).toEqual({ width: 0, x: 300 })
})

test('remains compatible with an older editor worker', () => {
  expect(getCompletionHorizontalBounds(items, 320)).toEqual({ width: 273, x: 320 })
})
