import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'editor.completion-provider-throws-error-provider',
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    throw new Error('Provider failed to get completions')
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
