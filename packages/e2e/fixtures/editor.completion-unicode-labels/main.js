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
        label: 'αβγδ',
      },
      {
        type: 1,
        label: 'λάμβδα',
      },
      {
        type: 1,
        label: 'привет',
      },
      {
        type: 1,
        label: 'Москва',
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
