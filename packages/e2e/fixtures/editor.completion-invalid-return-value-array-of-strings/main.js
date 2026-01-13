const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return ['string1', 'string2', 'string3']
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

export const activate = () => {
  // @ts-ignore
  vscode.registerCompletionProvider(provider)
}
