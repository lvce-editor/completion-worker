import type { CompletionItem } from '../CompletionItem/CompletionItem.ts'

const minWidth = 200
const maxWidth = 600
const fontSize = 15
const padding = 48
const wideCharacterRegExp = /\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}|\p{Extended_Pictographic}/u

const getCharacterWidth = (character: string): number => {
  if (wideCharacterRegExp.test(character)) {
    return fontSize
  }
  if (character === ' ') {
    return fontSize * 0.4
  }
  return fontSize * 0.75
}

const getLabelWidth = (label: string): number => {
  let width = 0
  for (const character of label) {
    width += getCharacterWidth(character)
  }
  return width
}

export const getCompletionWidth = (items: readonly CompletionItem[]): number => {
  let labelWidth = 0
  for (const item of items) {
    labelWidth = Math.max(labelWidth, getLabelWidth(item.label || ''))
  }
  return Math.min(maxWidth, Math.max(minWidth, Math.ceil(labelWidth + padding)))
}
