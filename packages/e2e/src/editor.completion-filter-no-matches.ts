import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-filter-no-matches'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main, Workspace }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-edge-cases')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'missing')
  await Workspace.setUri(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 7)

  // act
  await Editor.openCompletion()

  // assert
  const completions = Locator('.EditorCompletion')
  const items = Locator('.EditorCompletionItem')
  await expect(completions).toBeVisible()
  await expect(completions).toHaveText('No Suggestions')
  await expect(items).toHaveCount(0)
}
