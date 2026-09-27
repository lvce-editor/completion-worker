import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'completionManyResults',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
    const count = 1_000_000
    const completions = []
    for (let i = 0; i < count; i++) {
      completions.push({
        type: 1,
        label: 'test',
      })
    }
    return completions
  },
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
