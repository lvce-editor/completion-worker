import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'editor.completion-wide-label-provider',
  languageId: 'xyz',
  provideCompletions() {
    return [
      {
        type: 1,
        label: 'window.titleBarStyle',
      },
    ]
  },
  resolveCompletionItem() {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
