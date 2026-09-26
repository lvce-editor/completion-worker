import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-end-selects-last'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, KeyBoard, Locator, Main, Workspace }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-edge-cases')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, ' ')
  await Workspace.setUri(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 0)

  // act
  await Editor.openCompletion()
  const items = Locator('.EditorCompletionItem')
  await expect(items).toHaveCount(3)
  await KeyBoard.press('End')
  await KeyBoard.press('Enter')

  // assert
  await Editor.shouldHaveText('gamma ')
}
