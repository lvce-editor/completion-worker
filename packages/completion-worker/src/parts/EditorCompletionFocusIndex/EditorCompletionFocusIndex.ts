import type { CompletionState } from '../CompletionState/CompletionState.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'

const getScrolledState = (state: CompletionState, index: number, deltaY: number): CompletionState => {
  const { finalDeltaY, headerHeight, height, itemHeight, items } = state
  const listHeight = height - headerHeight
  const newDeltaY = Math.max(0, Math.min(deltaY, finalDeltaY))
  const minLineY = Math.floor(newDeltaY / itemHeight)
  const visibleItemCount = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(minLineY + visibleItemCount, items.length)
  return {
    ...state,
    deltaY: newDeltaY,
    focused: true,
    focusedIndex: index,
    maxLineY,
    minLineY,
  }
}

export const focusIndex = (state: CompletionState, index: number): CompletionState => {
  const { items } = state
  if (items.length === 0) {
    return {
      ...state,
      focused: true,
      focusedIndex: -1,
    }
  }
  const boundedIndex = Math.max(0, Math.min(index, items.length - 1))
  const { headerHeight, height, itemHeight, maxLineY, minLineY } = state
  if (boundedIndex < minLineY) {
    return getScrolledState(state, boundedIndex, boundedIndex * itemHeight)
  }
  const listHeight = height - headerHeight
  if (boundedIndex >= maxLineY) {
    return getScrolledState(state, boundedIndex, (boundedIndex + 1) * itemHeight - listHeight)
  }
  const newState: CompletionState = {
    ...state,
    focused: true,
    focusedIndex: boundedIndex,
  }
  return newState
}
