import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-enter-accepts-filtered-item'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, KeyBoard, Locator, Main, Workspace }) => {
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-edge-cases')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, '')
  await Workspace.setUri(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.openCompletion()
  await Editor.type('al')

  const completions = Locator('.EditorCompletion')
  const items = Locator('.EditorCompletionItem')
  await expect(completions).toBeVisible()
  await expect(items).toHaveCount(1)
  await expect(items).toHaveText('alpha')
  await KeyBoard.press('Enter')
  await expect(completions).toBeHidden()
  await Editor.shouldHaveText('alpha')

  await KeyBoard.press('Enter')
  await Editor.shouldHaveText('alpha\n')
}
