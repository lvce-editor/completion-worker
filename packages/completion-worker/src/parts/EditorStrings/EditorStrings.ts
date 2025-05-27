import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const goToDefinition = (): string => {
  return I18nString.i18nString(UiStrings.GoToDefinition)
}

export const noDefinitionFound = (): string => {
  return I18nString.i18nString(UiStrings.NoDefinitionFound)
}

export const noDefinitionFoundFor = (word: string) => {
  return I18nString.i18nString(UiStrings.NoDefinitionFoundFor, {
    PH1: word,
  })
}

export const noTypeDefinitionFoundFor = (word: string) => {
  return I18nString.i18nString(UiStrings.NoTypeDefinitionFoundFor, {
    PH1: word,
  })
}

export const noTypeDefinitionFound = (): string => {
  return I18nString.i18nString(UiStrings.NoTypeDefinitionFound)
}

export const noResults = (): string => {
  return I18nString.i18nString(UiStrings.NoResults)
}

export const replace = (): string => {
  return I18nString.i18nString(UiStrings.Replace)
}

export const sourceAction = (): string => {
  return I18nString.i18nString(UiStrings.SourceAction)
}

export const organizeImports = (): string => {
  return I18nString.i18nString(UiStrings.OrganizeImports)
}

export const sortImports = (): string => {
  return I18nString.i18nString(UiStrings.SortImports)
}

export const noCodeActionsAvailable = (): string => {
  return I18nString.i18nString(UiStrings.NoCodeActionsAvailable)
}

export const escapeToClose = (): string => {
  return I18nString.i18nString(UiStrings.EscapeToClose)
}

export const enterCode = (): string => {
  return I18nString.i18nString(UiStrings.EnterCode)
}

export const goToTypeDefinition = (): string => {
  return I18nString.i18nString(UiStrings.GoToTypeDefinition)
}

export const findAllReferences = (): string => {
  return I18nString.i18nString(UiStrings.FindAllReferences)
}

export const findAllImplementations = (): string => {
  return I18nString.i18nString(UiStrings.FindAllImplementations)
}

export const cut = (): string => {
  return I18nString.i18nString(UiStrings.Cut)
}

export const copy = (): string => {
  return I18nString.i18nString(UiStrings.Copy)
}

export const paste = (): string => {
  return I18nString.i18nString(UiStrings.Paste)
}

export const undo = (): string => {
  return I18nString.i18nString(UiStrings.Undo)
}

export const redo = (): string => {
  return I18nString.i18nString(UiStrings.Redo)
}

export const toggleLineComment = (): string => {
  return I18nString.i18nString(UiStrings.ToggleLineComment)
}

export const toggleBlockComment = (): string => {
  return I18nString.i18nString(UiStrings.ToggleBlockComment)
}

export const separator = (): string => {
  return ''
}

export const selectAll = (): string => {
  return I18nString.i18nString(UiStrings.SelectAll)
}

export const copyLineUp = (): string => {
  return I18nString.i18nString(UiStrings.CopyLineUp)
}

export const copyLineDown = (): string => {
  return I18nString.i18nString(UiStrings.CopyLineDown)
}

export const moveLineUp = (): string => {
  return I18nString.i18nString(UiStrings.MoveLineUp)
}

export const moveLineDown = (): string => {
  return I18nString.i18nString(UiStrings.MoveLineDown)
}

export const duplicateSelection = (): string => {
  return I18nString.i18nString(UiStrings.DuplicateSelection)
}

export const formatDocument = (): string => {
  return I18nString.i18nString(UiStrings.FormatDocument)
}

export const editorShowHover = (): string => {
  return I18nString.i18nString(UiStrings.EditorShowHover)
}

export const editorFormatDocumentForced = (): string => {
  return I18nString.i18nString(UiStrings.EditorFormatDocumentForced)
}

export const editorSelectNextOccurrence = (): string => {
  return I18nString.i18nString(UiStrings.EditorSelectNextOccurrence)
}

export const editorSelectAllOccurrences = (): string => {
  return I18nString.i18nString(UiStrings.EditorSelectAllOccurrences)
}

export const editorGoToDefinition = (): string => {
  return I18nString.i18nString(UiStrings.EditorGoToDefinition)
}

export const editorGoToTypeDefinition = (): string => {
  return I18nString.i18nString(UiStrings.EditorGoToTypeDefinition)
}

export const editorSelectInsideString = (): string => {
  return I18nString.i18nString(UiStrings.EditorSelectInsideString)
}

export const editorIndent = (): string => {
  return I18nString.i18nString(UiStrings.EditorIndent)
}

export const editorUnindent = (): string => {
  return I18nString.i18nString(UiStrings.EditorUnindent)
}

export const editorSortLinesAscending = (): string => {
  return I18nString.i18nString(UiStrings.EditorSortLinesAscending)
}

export const editorToggleComment = (): string => {
  return I18nString.i18nString(UiStrings.EditorToggleComment)
}

export const editorSelectUp = (): string => {
  return I18nString.i18nString(UiStrings.EditorSelectUp)
}

export const editorSelectDown = (): string => {
  return I18nString.i18nString(UiStrings.EditorSelectDown)
}

export const editorToggleBlockComment = (): string => {
  return I18nString.i18nString(UiStrings.EditorToggleBlockComment)
}

export const editorOpenColorPicker = (): string => {
  return I18nString.i18nString(UiStrings.EditorOpenColorPicker)
}

export const editorCloseColorPicker = (): string => {
  return I18nString.i18nString(UiStrings.EditorCloseColorPicker)
}

export const editorCopyLineDown = (): string => {
  return I18nString.i18nString(UiStrings.EditorCopyLineDown)
}

export const editorCopyLineUp = (): string => {
  return I18nString.i18nString(UiStrings.EditorCopyLineUp)
}
