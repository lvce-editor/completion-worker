const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    const count = 100_000
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

export const activate = () => {
  // @ts-ignore
  vscode.registerCompletionProvider(provider)
}
