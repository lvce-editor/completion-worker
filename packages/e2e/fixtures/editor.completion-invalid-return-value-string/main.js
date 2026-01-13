const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return 'invalid string'
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

export const activate = () => {
  // @ts-ignore
  vscode.registerCompletionProvider(provider)
}
