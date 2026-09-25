import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'editor.completion-type-error-provider',
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    throw new TypeError('x is not a function')
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
