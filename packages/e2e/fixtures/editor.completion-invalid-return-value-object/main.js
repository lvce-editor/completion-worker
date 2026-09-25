import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'editor.completion-invalid-return-value-object-provider',
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return {
      type: 1,
      label: null,
    }
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
