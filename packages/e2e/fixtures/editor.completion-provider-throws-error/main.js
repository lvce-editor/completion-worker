const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    throw new Error('Provider failed to get completions')
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

export const activate = () => {
  // @ts-ignore
  vscode.registerCompletionProvider(provider)
}
