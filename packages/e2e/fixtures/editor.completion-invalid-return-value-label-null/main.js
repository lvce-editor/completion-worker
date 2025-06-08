const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return [
      {
        type: 1,
        label: null,
      },
    ]
  },
  resolveCompletionItem(textDocument, offset, name, completionItem) {
    return undefined
  },
}

export const activate = () => {
  // @ts-ignore
  vscode.registerCompletionProvider(provider)
}
