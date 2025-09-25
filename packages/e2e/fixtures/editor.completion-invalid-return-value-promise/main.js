const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return [
      {
        type: Promise.resolve(1),
        label: 'test',
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
