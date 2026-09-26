import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import * as GetCompletionWidth from '../GetCompletionWidth/GetCompletionWidth.ts'

export const getCompletionHorizontalBounds = (
  items: readonly CompletionItem[],
  cursorX: number,
  editorX?: number,
  editorWidth?: number,
): { width: number; x: number } => {
  const preferredWidth = GetCompletionWidth.getCompletionWidth(items)
  // Older editor workers do not include pane bounds in the cursor response.
  if (editorX === undefined || editorWidth === undefined) {
    return { width: preferredWidth, x: cursorX }
  }
  const width = Math.min(preferredWidth, Math.max(0, editorWidth))
  const x = Math.max(editorX, Math.min(cursorX, editorX + editorWidth - width))
  return { width, x }
}
