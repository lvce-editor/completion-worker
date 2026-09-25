import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const EditorCompletionItemFocused = MergeClassNames.mergeClassNames(ClassNames.EditorCompletionItem, ClassNames.EditorCompletionItemFocused)
const EditorCompletionItemDeprecated = MergeClassNames.mergeClassNames(ClassNames.EditorCompletionItem, ClassNames.EditorCompletionItemDeprecated)
const EditorCompletionItemFocusedDeprecated = MergeClassNames.mergeClassNames(
  ClassNames.EditorCompletionItem,
  ClassNames.EditorCompletionItemFocused,
  ClassNames.EditorCompletionItemDeprecated,
)

export const getCompletionItemClassName = (focused: boolean, deprecated: boolean | number): string => {
  if (focused && deprecated) {
    return EditorCompletionItemFocusedDeprecated
  }
  if (focused) {
    return EditorCompletionItemFocused
  }
  if (deprecated) {
    return EditorCompletionItemDeprecated
  }
  return ClassNames.EditorCompletionItem
}
