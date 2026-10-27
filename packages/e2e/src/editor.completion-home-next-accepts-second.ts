import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-home-next-accepts-second'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, KeyBoard, Locator, Main, Workspace }) => {
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-edge-cases')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, '')
  await Workspace.setUri(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 0)
  await Editor.openCompletion()
  const completions = Locator('.EditorCompletion')
  await expect(completions).toBeVisible()
  await KeyBoard.press('ArrowUp')
  await KeyBoard.press('ArrowDown')
  const focusedItem = Locator('.EditorCompletionItemFocused')
  await expect(focusedItem).toHaveText('alpha')
  await KeyBoard.press('Enter')
  await expect(completions).toBeHidden()
  await Editor.shouldHaveText('alpha')
}
