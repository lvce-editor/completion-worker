const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return [
      {
        type: 1,
        label: 'שלום',
      },
      {
        type: 1,
        label: 'مرحبا',
      },
      {
        type: 1,
        label: 'עברית',
      },
      {
        type: 1,
        label: 'العربية',
      },
      {
        type: 1,
        label: 'mixed_שלום_text',
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
