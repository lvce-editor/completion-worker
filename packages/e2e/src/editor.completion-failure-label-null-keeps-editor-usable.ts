import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-failure-label-null-keeps-editor-usable'

export const test: Test = async ({ Editor, Extension, FileSystem, Main, Workspace }) => {
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-failure-cases')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.xyz`, 'label-null')
  await Workspace.setUri(tmpDir)
  await Main.openUri(`${tmpDir}/file1.xyz`)
  await Editor.setCursor(0, 'label-null'.length)

  await Editor.openCompletion()
  await Editor.type(' recovery')
  await Editor.shouldHaveText('label-null recovery')
}
