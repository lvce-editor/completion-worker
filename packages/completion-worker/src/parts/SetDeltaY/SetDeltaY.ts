import type { VirtualListState } from '../VirtualListState/VirtualListState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as GetNewOffsets from '../GetNewOffsets/GetNewOffsets.ts'

export const setDeltaY = <K, T extends VirtualListState<K>>(state: T, value: number): T => {
  Assert.object(state)
  Assert.number(value)
  const { itemHeight, finalDeltaY, deltaY, height, headerHeight, items } = state
  const { newDeltaY, newMaxLineY, newMinLineY, modified } = GetNewOffsets.getNewOffsets(
    itemHeight,
    finalDeltaY,
    deltaY,
    height,
    headerHeight,
    value,
    items.length,
  )
  if (!modified) {
    return state
  }
  return {
    ...state,
    deltaY: newDeltaY,
    minLineY: newMinLineY,
    maxLineY: newMaxLineY,
  }
}
