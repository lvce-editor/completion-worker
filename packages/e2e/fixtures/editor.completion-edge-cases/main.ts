import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-edge-cases-provider',
  languageId: 'xyz',
  provideCompletions() {
    return ['alpha', 'beta', 'gamma'].map((label) => ({
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
