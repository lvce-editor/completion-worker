import { EditorWorker, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'

interface TextDocument {
  readonly documentId: number
  readonly languageId: string
  readonly text: string
  readonly uri: string
}

const getText = async (editorUid: number): Promise<string> => {
  const lines = await EditorWorker.getLines(editorUid)
  return lines.join('\n')
}

const getTextDocument = async (editorUid: number, languageId: string): Promise<TextDocument> => {
  const [text, uri] = await Promise.all([getText(editorUid), EditorWorker.getUri(editorUid)])
  return {
    documentId: editorUid,
    languageId,
    text,
    uri,
  }
}

export const executeCompletionProvider = async (editorUid: number, editorLanguageId: string, offset: number): Promise<readonly CompletionItem[]> => {
  const textDocument = await getTextDocument(editorUid, editorLanguageId)
  return ExtensionManagementWorker.invoke('Extensions.executeCompletionProvider', textDocument, offset)
}

export const executeResolveCompletionItem = async (editorUid: number, offset: number, name: string, completionItem: CompletionItem): Promise<any> => {
  const editorLanguageId = await EditorWorker.getLanguageId(editorUid)
  const textDocument = await getTextDocument(editorUid, editorLanguageId)
  return ExtensionManagementWorker.invoke('Extensions.executeResolveCompletionItemProvider', textDocument, offset, name, completionItem)
}
