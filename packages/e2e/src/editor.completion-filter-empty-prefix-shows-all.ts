import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-filter-empty-prefix-shows-all'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main, Workspace }) => {
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-edge-cases')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, ' ')
  await Workspace.setUri(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 1)
  await Editor.openCompletion()
  const completions = Locator('.EditorCompletion')
  const items = Locator('.EditorCompletionItem')
  await expect(completions).toBeVisible()
  await expect(items).toHaveCount(3)
  const item0 = items.nth(0)
  await expect(item0).toHaveText('alpha')
  const item1 = items.nth(1)
  await expect(item1).toHaveText('beta')
  const item2 = items.nth(2)
  await expect(item2).toHaveText('gamma')
}
