import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-empty-provider',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
    return []
  },
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return {}
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
