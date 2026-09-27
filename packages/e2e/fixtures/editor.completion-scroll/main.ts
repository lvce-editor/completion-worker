import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-scroll-provider',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
    const items = []
    for (let i = 0; i < 100; i++) {
      items.push({
        type: 1,
        label: `test ${i}`,
      })
    }
    return items
  },
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return {}
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
