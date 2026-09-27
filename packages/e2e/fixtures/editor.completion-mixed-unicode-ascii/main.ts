import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-mixed-unicode-ascii-provider',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
    return [
      {
        type: 1,
        label: 'hello_世界',
      },
      {
        type: 1,
        label: 'test_αβγ',
      },
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
        label: 'über_function',
      },
      {
        type: 1,
        label: 'señor_method',
      },
    ]
  },
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
