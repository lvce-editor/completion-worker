import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-emoji-labels'

export const test: Test = async ({ Extension, FileSystem, Workspace, Main, Editor, Locator, expect }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-emoji-labels')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
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
  await expect(first).toHaveText('🚀 rocket')
  const second = items.nth(1)
  await expect(second).toHaveText('🎉 party')
}
