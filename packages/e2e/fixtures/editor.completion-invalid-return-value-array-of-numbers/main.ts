import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-invalid-return-value-array-of-numbers-provider',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
    return [1, 2, 3, 4, 5] as unknown as ReturnType<CompletionProvider['provideCompletions']>
  },
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
