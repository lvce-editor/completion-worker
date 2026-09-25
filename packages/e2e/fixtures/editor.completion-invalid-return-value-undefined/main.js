import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'editor.completion-invalid-return-value-undefined-provider',
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return undefined
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
