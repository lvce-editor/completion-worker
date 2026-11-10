import { activate as activateExtensionApi, registerCompletionProvider, type CompletionProvider } from '@lvce-editor/api'

const provider: CompletionProvider = {
  id: 'editor.completion-failure-cases-provider',
  languageId: 'xyz',
  provideCompletions(textDocument) {
    switch (textDocument.text) {
      case 'sync-throw':
        throw new Error('Completion provider failed')
      case 'async-reject':
        return Promise.reject(new Error('Completion provider rejected'))
      case 'null':
        return null as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'undefined':
        return undefined as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'boolean':
        return true as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'number':
        return 42 as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'string':
        return 'invalid completions' as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'object':
        return { label: 'invalid completion list' } as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'array-strings':
        return ['alpha', 'beta'] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'array-numbers':
        return [1, 2] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'array-booleans':
        return [true, false] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'array-nulls':
        return [null, null] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'empty-item':
        return [{}] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'label-null':
        return [{ label: null }] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'label-number':
        return [{ label: 42 }] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'label-object':
        return [{ label: { text: 'not a label' } }] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'label-array':
        return [{ label: ['not', 'a', 'label'] }] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'null-item':
        return [null] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'function-property':
        return [{ label: 'function property', extra: () => undefined }] as unknown as ReturnType<CompletionProvider['provideCompletions']>
      case 'worker-close':
        close()
        return []
      default:
        return []
    }
  },
}

await activateExtensionApi()
registerCompletionProvider(provider)
