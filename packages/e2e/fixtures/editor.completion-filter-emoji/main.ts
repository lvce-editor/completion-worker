import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-filter-emoji-provider',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
    return [
      {
        type: 1,
        label: '🚀rocket',
      },
      {
        type: 1,
        label: '🎉party',
      },
      {
        type: 1,
        label: '❤️heart',
      },
      {
        type: 1,
        label: '🔥fire',
      },
      {
        type: 1,
        label: '⭐star',
      },
      {
        type: 1,
        label: 'regular',
      },
      {
        type: 1,
        label: 'rocket_launcher',
      },
    ]
  },
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
