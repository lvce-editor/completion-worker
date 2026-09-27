import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-editor-emoji-content-provider',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
    return [
      {
        type: 1,
        label: 'complete',
      },
      {
        type: 1,
        label: 'content',
      },
      {
        type: 1,
        label: 'create',
      },
    ]
  },
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
