import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'editor.completion-empty-provider',
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return []
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return {}
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
