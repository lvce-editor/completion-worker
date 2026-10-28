import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-two-results-provider',
  languageId: 'xyz',
  provideCompletions() {
    return ['alpha', 'beta'].map((label) => ({
      type: 1,
      label,
    }))
  },
  resolveCompletionItem() {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
