import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const noResults = (): string => {
  return I18nString.i18nString(UiStrings.NoResults)
}

export const noSuggestions = (): string => {
  return I18nString.i18nString(UiStrings.NoSuggestions)
}

export const suggest = (): string => {
  return I18nString.i18nString(UiStrings.Suggest)
}
