const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return [1, 2, 3, 4, 5]
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

export const activate = () => {
  // @ts-ignore
  vscode.registerCompletionProvider(provider)
}
