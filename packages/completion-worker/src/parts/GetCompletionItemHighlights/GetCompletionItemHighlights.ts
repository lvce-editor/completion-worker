export const getHighlights = (item: any): readonly any[] => {
  const { matches } = item
  return matches.slice(1)
}
