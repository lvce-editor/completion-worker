const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return [
      {
        type: 1,
        label: '🚀 rocket',
      },
      {
        type: 1,
        label: '🎉 party',
      },
      {
        type: 1,
        label: '❤️ heart',
      },
      {
        type: 1,
        label: '🔥 fire',
      },
      {
        type: 1,
        label: '⭐ star',
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
