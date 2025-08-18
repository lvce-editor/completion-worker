import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import * as Assert from '../Assert/Assert.ts'
import * as ExtensionHostCompletion from '../ExtensionHostCompletion/ExtensionHostCompletion.ts'
import * as GetOffsetAtCursor from '../GetOffsetAtCursor/GetOffsetAtCursor.ts'

// TODO don't send unnecessary parts of completion item like matches
export const resolveCompletion = async (editorUid: number, name: string, completionItem: CompletionItem): Promise<any> => {
  try {
    Assert.string(name)
    Assert.object(completionItem)
    const offset = await GetOffsetAtCursor.getOffsetAtCursor(editorUid)
    const resolvedCompletionItem = await ExtensionHostCompletion.executeResolveCompletionItem(editorUid, offset, name, completionItem)
    return resolvedCompletionItem
  } catch {
    return undefined
  }
}
