import { activate as activateExtensionApi, registerCompletionProvider } from '@lvce-editor/api'

const provider = {
  id: 'completionManyResults',
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
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
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
