import type { Test } from '@lvce-editor/test-with-playwright'

/* cspell:words שלום مرحبا */

export const name = 'editor.completion-rtl-characters'

export const skip = 1

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main, Workspace }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-rtl-characters')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, '')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 0)

  // act
  await Editor.openCompletion()

  // assert
  const completions = Locator('.EditorCompletion')
  await expect(completions).toBeVisible()
  const items = Locator('.EditorCompletionItem')
  await expect(items).toHaveCount(5)
  const first = items.nth(0)
  await expect(first).toHaveText('שלום')
  const second = items.nth(1)
  await expect(second).toHaveText('مرحبا')
}
