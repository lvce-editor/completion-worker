import * as ExtensionHostActivationEvent from '../ExtensionHostActivationEvent/ExtensionHostActivationEvent.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'
import * as ExtensionHostEditor from '../ExtensionHostEditor/ExtensionHostEditor.ts'

const combineResults = (results: any) => {
  return results[0] ?? []
}

export const executeCompletionProvider = async (editorUid: number, editorLanguageId: string, offset: number) => {
  return ExtensionHostEditor.execute({
    args: [offset],
    combineResults,
    editorLanguageId,
    editorUid,
    event: ExtensionHostActivationEvent.OnCompletion,
    method: ExtensionHostCommandType.CompletionExecute,
  })
}

const combineResultsResolve = (items: any) => {
  return items[0] ?? undefined
}

export const executeResolveCompletionItem = async (editorUid: any, offset: any, name: any, completionItem: any) => {
  return ExtensionHostEditor.execute({
    args: [offset, name, completionItem],
    combineResults: combineResultsResolve,
    editorUid,
    event: ExtensionHostActivationEvent.OnCompletion,
    method: ExtensionHostCommandType.CompletionResolveExecute,
  })
}
