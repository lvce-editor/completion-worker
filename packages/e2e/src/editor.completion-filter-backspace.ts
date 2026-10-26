import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-filter-backspace'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, KeyBoard, Locator, Main, Workspace }) => {
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-edge-cases')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'al')
  await Workspace.setUri(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 2)
  await Editor.openCompletion()

  const completions = Locator('.EditorCompletion')
  const items = Locator('.EditorCompletionItem')
  const highlights = Locator('.EditorCompletionItemHighlight')
  const firstHighlight = highlights.nth(0)
  const tokens = Locator('.Token')
  await expect(completions).toBeVisible()

  await expect(items).toHaveCount(1)
  await expect(items).toHaveText('alpha')
  await expect(highlights).toHaveText('al')

  await Editor.type('p')
  await expect(items).toHaveCount(1)
  await expect(highlights).toHaveText('alp')

  await Editor.type('z')
  await expect(items).toHaveCount(0)
  await expect(completions).toHaveText('No Suggestions')
  await expect(highlights).toHaveCount(0)

  await Editor.deleteCharacterLeft()
  await expect(items).toHaveCount(1)
  await expect(items).toHaveText('alpha')
  await expect(highlights).toHaveText('alp')

  await Editor.deleteCharacterLeft()
  await expect(highlights).toHaveText('al')
  await Editor.deleteCharacterLeft()
  await expect(items).toHaveCount(2)
  await expect(firstHighlight).toHaveText('a')
  await KeyBoard.press('Escape')
  await expect(completions).toBeHidden()
  await Editor.openCompletion()
  await expect(items).toHaveCount(2)
  await KeyBoard.press('Enter')
  await expect(completions).toBeHidden()
  await expect(tokens).toHaveText('alpha')
}
