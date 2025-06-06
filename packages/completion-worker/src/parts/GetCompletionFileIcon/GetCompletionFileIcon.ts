import * as Character from '../Character/Character.ts'
import * as EditorCompletionType from '../EditorCompletionType/EditorCompletionType.ts'

// TODO
export const getCompletionFileIcon = (kind: number): string => {
  switch (kind) {
    case EditorCompletionType.File:
      return Character.EmptyString
    case EditorCompletionType.Folder:
      return Character.EmptyString
    default:
      return Character.EmptyString
  }
}
