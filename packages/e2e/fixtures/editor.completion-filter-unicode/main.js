const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return [
      {
        type: 1,
        label: 'café',
      },
      {
        type: 1,
        label: 'naïve',
      },
      {
        type: 1,
        label: 'résumé',
      },
      {
        type: 1,
        label: 'über',
      },
      {
        type: 1,
        label: 'señor',
      },
      {
        type: 1,
        label: 'façade',
      },
      {
        type: 1,
        label: 'test',
      },
      {
        type: 1,
        label: 'function',
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
