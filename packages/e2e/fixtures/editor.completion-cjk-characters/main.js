const provider = {
  languageId: 'xyz',
  provideCompletions(textDocument, offset) {
    return [
      {
        type: 1,
        label: '你好',
      },
      {
        type: 1,
        label: '世界',
      },
      {
        type: 1,
        label: 'こんにちは',
      },
      {
        type: 1,
        label: '안녕하세요',
      },
      {
        type: 1,
        label: '中文测试',
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
