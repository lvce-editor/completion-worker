import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-invalid-return-value-null'

export const skip = 1

export const test: Test = async ({ Extension, FileSystem, Workspace, Main, Editor }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-invalid-return-value-null')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'content 1')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 0)

  // act
  await Editor.openCompletion()

  // TODO check that error message is displayed
}
