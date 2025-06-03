import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import type { VisibleCompletionItem } from '../VisibleCompletionItem/VisibleCompletionItem.ts'
import * as CompletionItemFlags from '../CompletionItemFlags/CompletionItemFlags.ts'
import * as EditorCompletionMap from '../EditorCompletionMap/EditorCompletionMap.ts'
import * as GetCompletionFileIcon from '../GetCompletionFileIcon/GetCompletionFileIcon.ts'
import * as GetCompletionItemHighlights from '../GetCompletionItemHighlights/GetCompletionItemHighlights.ts'
import { getLabel } from '../GetLabel/GetLabel.ts'
import { getTop } from '../GetTop/GetTop.ts'

export const getVisibleIem = (
  item: CompletionItem,
  itemHeight: number,
  leadingWord: string,
  i: number,
  minLineY: number,
  focusedIndex: number,
  relative: number,
): VisibleCompletionItem => {
  return {
    label: getLabel(item),
    symbolName: EditorCompletionMap.getSymbolName(item.kind),
    top: getTop(i, minLineY, itemHeight, relative),
    highlights: GetCompletionItemHighlights.getHighlights(item),
    focused: i === focusedIndex,
    deprecated: item.flags & CompletionItemFlags.Deprecated,
    fileIcon: GetCompletionFileIcon.getCompletionFileIcon(item.kind),
  }
}
