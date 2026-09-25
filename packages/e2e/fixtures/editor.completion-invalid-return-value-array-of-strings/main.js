import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'editor.completion-invalid-return-value-array-of-strings-provider',
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return ['string1', 'string2', 'string3']
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
