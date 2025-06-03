import type { OffsetsResult } from '../OffsetsResult/OffsetsResult.ts'
import * as Clamp from '../Clamp/Clamp.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'

export const getNewOffsets = (
  itemHeight: number,
  finalDeltaY: number,
  deltaY: number,
  height: number,
  headerHeight: number,
  value: number,
  itemCount: number,
): OffsetsResult => {
  const listHeight = height - headerHeight
  const newDeltaY = Clamp.clamp(value, 0, finalDeltaY)
  if (deltaY === newDeltaY) {
    return {
      modified: false,
      newDeltaY: 0,
      newMinLineY: 0,
      newMaxLineY: 0,
    }
  }
  // TODO when it only moves by one px, items don't need to be rerendered, only negative margin
  const minLineY = Math.floor(newDeltaY / itemHeight)
  const maxLineY = Math.min(minLineY + GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight), itemCount - 1)
  return {
    newDeltaY: newDeltaY,
    newMinLineY: minLineY,
    newMaxLineY: maxLineY,
    modified: true,
  }
}
