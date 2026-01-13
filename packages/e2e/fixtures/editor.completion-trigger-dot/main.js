const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return [
      {
        type: 1,
        label: 'method1',
      },
      {
        type: 1,
        label: 'method2',
      },
      {
        type: 1,
        label: 'property1',
      },
      {
        type: 1,
        label: 'property2',
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
