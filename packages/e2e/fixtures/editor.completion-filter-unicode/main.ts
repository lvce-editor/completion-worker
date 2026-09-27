import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-filter-unicode-provider',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
    return [
      {
        type: 1,
        label: 'café',
      },
      {
        type: 1,
        label: 'naïve',
      },
      {
        type: 1,
        label: 'résumé',
      },
      {
        type: 1,
        label: 'über',
      },
      {
        type: 1,
        label: 'señor',
      },
      {
        type: 1,
        label: 'façade',
      },
      {
        type: 1,
        label: 'test',
      },
      {
        type: 1,
        label: 'function',
      },
    ]
  },
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
