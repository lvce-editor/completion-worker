export const getTop = (i: number, minLineY: number, itemHeight: number, relative: number): number => {
  return (i - minLineY) * itemHeight - relative
}
