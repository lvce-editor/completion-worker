import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-filter-emoji'

export const skip = 1

export const test: Test = async ({ Extension, FileSystem, Workspace, Main, Editor, Locator, expect }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-filter-emoji')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'rock')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 4)

  // act
  await Editor.openCompletion()

  // assert - should filter to items containing 'rock'
  const completions = Locator('.EditorCompletion')
  await expect(completions).toBeVisible()
  const items = Locator('.EditorCompletionItem')
  await expect(items).toHaveCount(2)
  const first = items.nth(0)
  await expect(first).toHaveText('🚀rocket')
  const second = items.nth(1)
  await expect(second).toHaveText('rocket_launcher')
}
