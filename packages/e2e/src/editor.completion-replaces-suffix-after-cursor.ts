import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-replaces-suffix-after-cursor'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, KeyBoard, Locator, Main, Workspace }) => {
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-edge-cases')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'alphabet')
  await Workspace.setUri(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 4)
  await Editor.openCompletion()
  const completions = Locator('.EditorCompletion')
  const items = Locator('.EditorCompletionItem')
  await expect(completions).toBeVisible()
  await expect(items).toHaveCount(1)
  const item0 = items.nth(0)
  await expect(item0).toHaveText('alpha')
  await KeyBoard.press('Enter')
  await expect(completions).toBeHidden()
  await Editor.shouldHaveText('alpha')
}
