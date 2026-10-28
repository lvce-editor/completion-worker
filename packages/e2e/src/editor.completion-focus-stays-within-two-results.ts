import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-focus-stays-within-two-results'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, KeyBoard, Locator, Main, Workspace }) => {
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-two-results')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, '')
  await Workspace.setUri(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.openCompletion()

  const completions = Locator('.EditorCompletion')
  await expect(completions).toBeVisible()
  const items = Locator('.EditorCompletionItem')
  await expect(items).toHaveCount(2)
  const focusedItem = Locator('.EditorCompletionItemFocused')
  await expect(focusedItem).toHaveText('alpha')
  await expect(focusedItem).toHaveCount(1)

  await KeyBoard.press('ArrowDown')
  await expect(focusedItem).toHaveText('beta')
  await expect(focusedItem).toHaveCount(1)
  await KeyBoard.press('ArrowDown')
  await expect(focusedItem).toHaveText('beta')
  await expect(focusedItem).toHaveCount(1)

  await KeyBoard.press('ArrowUp')
  await expect(focusedItem).toHaveText('alpha')
  await expect(focusedItem).toHaveCount(1)
  await KeyBoard.press('ArrowUp')
  await expect(focusedItem).toHaveText('alpha')
  await expect(focusedItem).toHaveCount(1)

  await KeyBoard.press('Enter')
  await expect(completions).toBeHidden()
  await Editor.shouldHaveText('alpha')
}
