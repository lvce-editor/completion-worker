export const getHighlights = (item: any): readonly number[] => {
  const { matches } = item
  return matches.slice(1)
}
