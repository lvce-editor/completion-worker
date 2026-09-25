import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getCompletionItemClassName = (focused: boolean, deprecated: boolean | number): string => {
  if (focused && deprecated) {
    return MergeClassNames.mergeClassNames(
      ClassNames.EditorCompletionItem,
      ClassNames.EditorCompletionItemFocused,
      ClassNames.EditorCompletionItemDeprecated,
    )
  }
  if (focused) {
    return MergeClassNames.mergeClassNames(ClassNames.EditorCompletionItem, ClassNames.EditorCompletionItemFocused)
  }
  if (deprecated) {
    return MergeClassNames.mergeClassNames(ClassNames.EditorCompletionItem, ClassNames.EditorCompletionItemDeprecated)
  }
  return ClassNames.EditorCompletionItem
}
