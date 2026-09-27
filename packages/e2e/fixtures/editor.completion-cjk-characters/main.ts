import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-cjk-characters-provider',
  languageId: 'xyz',
  provideCompletions(_textDocument, _offset) {
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
  resolveCompletionItem(_textDocument, _offset, _name, _completionItem) {
    return undefined
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
