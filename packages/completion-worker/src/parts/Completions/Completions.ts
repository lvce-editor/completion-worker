import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import * as ExtensionHostCompletion from '../ExtensionHostCompletion/ExtensionHostCompletion.ts'
import * as GetOffsetAtCursor from '../GetOffsetAtCursor/GetOffsetAtCursor.ts'
import * as Logger from '../Logger/Logger.ts'

// TODO possible to do this with events/state machine instead of promises -> enables canceling operations / concurrent calls
export const getCompletions = async (editorUid: number, editorLanguageId: string): Promise<readonly CompletionItem[]> => {
  try {
    const offset = GetOffsetAtCursor.getOffsetAtCursor(editorUid)
    const completions = await ExtensionHostCompletion.executeCompletionProvider(editorUid, editorLanguageId, offset)
    return completions
  } catch (error) {
    Logger.error(`Failed to get completions:`)
    Logger.error(error)
    return []
  }
}
