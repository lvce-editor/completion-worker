import type { Test } from '@lvce-editor/test-with-playwright'

interface CompletionTestOptions {
  readonly initialText?: string
  readonly cursor?: number
  readonly keys?: readonly string[]
  readonly expectedItems?: readonly string[]
  readonly expectedFocusedItem?: string
  readonly acceptedText?: string
  readonly close?: boolean
  readonly reopen?: boolean
}

export const createCompletionTest = (options: CompletionTestOptions = {}): Test => {
  const { acceptedText, close = false, cursor, expectedFocusedItem, expectedItems, initialText = ' ', keys = [], reopen = false } = options
  return async ({ Editor, expect, Extension, FileSystem, KeyBoard, Locator, Main, Workspace }) => {
    await Extension.addWebExtension(import.meta.resolve('../../fixtures/editor.completion-edge-cases'))
    const tmpDir = await FileSystem.getTmpDir()
    await FileSystem.writeFile(`${tmpDir}/file1.xyz`, initialText)
    await Workspace.setUri(tmpDir)
    await Main.openUri(`${tmpDir}/file1.xyz`)
    await Editor.setCursor(0, cursor ?? initialText.length)
    await Editor.openCompletion()

    const completions = Locator('.EditorCompletion')
    const items = Locator('.EditorCompletionItem')
    await expect(completions).toBeVisible()
    for (const key of keys) {
      await KeyBoard.press(key)
    }
    if (expectedItems) {
      await expect(items).toHaveCount(expectedItems.length)
      for (let index = 0; index < expectedItems.length; index++) {
        await expect(items.nth(index)).toHaveText(expectedItems[index])
      }
    }
    if (expectedFocusedItem) {
      await expect(Locator('.EditorCompletionItemFocused')).toHaveText(expectedFocusedItem)
    }
    if (acceptedText !== undefined) {
      await KeyBoard.press('Enter')
      await expect(completions).toBeHidden()
      await Editor.shouldHaveText(acceptedText)
    } else if (close) {
      await KeyBoard.press('Escape')
      await expect(completions).toBeHidden()
      await Editor.shouldHaveText(initialText)
      if (reopen) {
        await Editor.openCompletion()
        await expect(completions).toBeVisible()
        if (expectedItems) {
          await expect(items).toHaveCount(expectedItems.length)
          for (let index = 0; index < expectedItems.length; index++) {
            await expect(items.nth(index)).toHaveText(expectedItems[index])
          }
        }
      }
    }
  }
}
