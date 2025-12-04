export interface Bounds {
  readonly height: number
  readonly width: number
  readonly x: number
  readonly y: number
}

export const getCompletionDetailBounds = (completionBounds: Bounds, borderSize: number) => {
  return {
    x: completionBounds.x + completionBounds.width - borderSize,
    y: completionBounds.y,
    width: 100,
    height: 100,
  }
}
