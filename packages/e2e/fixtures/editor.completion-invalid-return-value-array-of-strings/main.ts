import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-invalid-return-value-array-of-strings-provider',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
    return ['string1', 'string2', 'string3'] as unknown as ReturnType<CompletionProvider['provideCompletions']>
  },
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
