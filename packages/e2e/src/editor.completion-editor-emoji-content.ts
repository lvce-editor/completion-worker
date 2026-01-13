import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-editor-emoji-content'

export const test: Test = async ({ Extension, FileSystem, Workspace, Main, Editor, Locator, expect }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-editor-emoji-content')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, '🚀🎉 hello 🔥 world ❤️')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 0)

  // act
  await Editor.openCompletion()

  // assert
  const completions = Locator('.EditorCompletion')
  await expect(completions).toBeVisible()
  const items = Locator('.EditorCompletionItem')
  await expect(items).toHaveCount(3)
  const first = items.nth(0)
  await expect(first).toHaveText('complete')
  const second = items.nth(1)
  await expect(second).toHaveText('content')
  const third = items.nth(2)
  await expect(third).toHaveText('create')
}
