import { EditorWorker, ExtensionManagementWorker, type TextDocument } from '@lvce-editor/rpc-registry'
import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'

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

export const executeCompletionProvider = async (
  editorUid: number,
  editorLanguageId: string,
  offset: number,
  applicationId: string | undefined,
): Promise<readonly CompletionItem[]> => {
  const textDocument = await getTextDocument(editorUid, editorLanguageId)
  return ExtensionManagementWorker.executeCompletionProvider<CompletionItem>(textDocument, offset, applicationId)
}

export const executeResolveCompletionItem = async (
  editorUid: number,
  offset: number,
  name: string,
  completionItem: CompletionItem,
  applicationId: string | undefined,
): Promise<any> => {
  const editorLanguageId = await EditorWorker.getLanguageId(editorUid)
  const textDocument = await getTextDocument(editorUid, editorLanguageId)
  return ExtensionManagementWorker.executeResolveCompletionItemProvider(textDocument, offset, name, completionItem, applicationId)
}
