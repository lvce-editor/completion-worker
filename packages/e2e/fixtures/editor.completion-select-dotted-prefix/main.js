const provider = {
  languageId: 'nvmrc',
  provideCompletions() {
    return [
      {
        label: 'v26.7.0',
        type: 1,
      },
    ]
  },
  resolveCompletionItem() {
    return undefined
  },
}

export const activate = () => {
  // @ts-ignore
  vscode.registerCompletionProvider(provider)
}
