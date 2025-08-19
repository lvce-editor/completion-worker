import * as ExtensionHostActivationEvent from '../ExtensionHostActivationEvent/ExtensionHostActivationEvent.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'
import * as ExtensionHostEditor from '../ExtensionHostEditor/ExtensionHostEditor.ts'

const combineResults = (results: any) => {
  return results[0] ?? []
}

export const executeCompletionProvider = async (editorUid: number, editorLanguageId: string, offset: number) => {
  return ExtensionHostEditor.execute({
    editorUid,
    editorLanguageId,
    event: ExtensionHostActivationEvent.OnCompletion,
    method: ExtensionHostCommandType.CompletionExecute,
    args: [offset],
    combineResults,
  })
}

const combineResultsResolve = (items: any) => {
  return items[0] ?? undefined
}

export const executeResolveCompletionItem = async (editorUid: any, offset: any, name: any, completionItem: any) => {
  return ExtensionHostEditor.execute({
    editorUid,
    event: ExtensionHostActivationEvent.OnCompletion,
    method: ExtensionHostCommandType.CompletionResolveExecute,
    args: [offset, name, completionItem],
    combineResults: combineResultsResolve,
  })
}
