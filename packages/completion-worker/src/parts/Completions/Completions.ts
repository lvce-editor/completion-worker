import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import * as Assert from '../Assert/Assert.ts'
import * as ExtensionHostCompletion from '../ExtensionHostCompletion/ExtensionHostCompletion.ts'
import * as GetOffsetAtCursor from '../GetOffsetAtCursor/GetOffsetAtCursor.ts'

// TODO possible to do this with events/state machine instead of promises -> enables canceling operations / concurrent calls
export const getCompletions = async (editorUid: number, editorLanguageId: string): Promise<readonly CompletionItem[]> => {
  const offset = GetOffsetAtCursor.getOffsetAtCursor(editorUid)
  const completions = await ExtensionHostCompletion.executeCompletionProvider(editorUid, editorLanguageId, offset)
  return completions
}

// TODO don't send unnecessary parts of completion item like matches
export const resolveCompletion = async (editorUid: number, name: string, completionItem: any): Promise<any> => {
  try {
    Assert.string(name)
    Assert.object(completionItem)
    const offset = GetOffsetAtCursor.getOffsetAtCursor(editorUid)
    const resolvedCompletionItem = await ExtensionHostCompletion.executeResolveCompletionItem(editorUid, offset, name, completionItem)
    return resolvedCompletionItem
  } catch {
    return undefined
  }
}
