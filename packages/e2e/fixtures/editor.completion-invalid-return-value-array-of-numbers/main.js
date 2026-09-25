import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'editor.completion-invalid-return-value-array-of-numbers-provider',
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return [1, 2, 3, 4, 5]
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
