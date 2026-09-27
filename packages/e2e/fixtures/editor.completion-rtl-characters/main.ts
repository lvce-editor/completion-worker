import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-rtl-characters-provider',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
    return [
      {
        type: 1,
        label: 'שלום',
      },
      {
        type: 1,
        label: 'مرحبا',
      },
      {
        type: 1,
        label: 'עברית',
      },
      {
        type: 1,
        label: 'العربية',
      },
      {
        type: 1,
        label: 'mixed_שלום_text',
      },
    ]
  },
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
