import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'editor.completion-invalid-return-value-promise-provider',
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return [
      {
        type: Promise.resolve(1),
        label: 'test',
      },
    ]
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
