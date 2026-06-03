import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'
import * as ExtensionHostActivationEvent from '../ExtensionHostActivationEvent/ExtensionHostActivationEvent.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'
import * as ExtensionHostEditor from '../ExtensionHostEditor/ExtensionHostEditor.ts'

const combineResults = (results: readonly (readonly CompletionItem[])[]): readonly CompletionItem[] => {
  return results[0] ?? []
}

export const executeCompletionProvider = async (editorUid: number, editorLanguageId: string, offset: number): Promise<readonly CompletionItem[]> => {
  return ExtensionHostEditor.execute({
    args: [offset],
    combineResults,
    editorLanguageId,
    editorUid,
    event: ExtensionHostActivationEvent.OnCompletion,
    method: ExtensionHostCommandType.CompletionExecute,
  })
}

const combineResultsResolve = (items: readonly any[]): any => {
  return items[0] ?? undefined
}

export const executeResolveCompletionItem = async (editorUid: number, offset: number, name: string, completionItem: CompletionItem): Promise<any> => {
  return ExtensionHostEditor.execute({
    args: [offset, name, completionItem],
    combineResults: combineResultsResolve,
    editorUid,
    event: ExtensionHostActivationEvent.OnCompletion,
    method: ExtensionHostCommandType.CompletionResolveExecute,
  })
}
