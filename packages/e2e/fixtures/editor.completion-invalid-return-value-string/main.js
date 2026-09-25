import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'editor.completion-invalid-return-value-string-provider',
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return 'invalid string'
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
