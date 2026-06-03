import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-scroll'

export const skip = 1

export const test: Test = async ({ Command, Editor, expect, Extension, FileSystem, Locator, Main, Workspace }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-scroll')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 0)

  // act
  await Editor.openCompletion()

  // assert
  const firstItem = Locator('.EditorCompletionItem').nth(0)
  await expect(firstItem).toHaveText('test 0')

  // act
  await Command.execute('EditorCompletion.handleWheel', 0, 20)

  // assert
  await expect(firstItem).toHaveText('test 1')
}
