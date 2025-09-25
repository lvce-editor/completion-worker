export const getIndexFromPosition = (y: number, clientY: number, itemHeight: number): number => {
  const relativeY = clientY - y
  const index = Math.floor(relativeY / itemHeight)
  return index
}
