const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    throw new TypeError('x is not a function')
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

export const activate = () => {
  // @ts-ignore
  vscode.registerCompletionProvider(provider)
}
