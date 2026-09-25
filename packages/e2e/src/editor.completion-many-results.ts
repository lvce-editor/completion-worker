import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-many-results'

export const test: Test = async ({ Editor, EditorCompletion, expect, Extension, FileSystem, Locator, Main, Workspace }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-many-results')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, ' ')
  await Workspace.setUri(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 0)

  // act
  await Editor.openCompletion()

  // assert
  const completions = Locator('.EditorCompletion')
  await expect(completions).toBeVisible()
  const items = Locator('.EditorCompletionItem')
  await expect(items).toHaveCount(8)
  const first = items.nth(0)
  await expect(first).toHaveText('test')

  // act
  await EditorCompletion.selectIndex(0)

  // assert
  const token = Locator('.Token.Unknown')
  await expect(token).toHaveText('test ')
}
