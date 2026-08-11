import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.completion-select-dotted-prefix'

export const skip = 1

export const test: Test = async ({ Editor, EditorCompletion, expect, Extension, FileSystem, Locator, Main, Workspace }) => {
  const extensionUri = import.meta.resolve('../fixtures/editor.completion-select-dotted-prefix')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/.nvmrc`, 'v26.')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/.nvmrc`)
  await Editor.setCursor(0, 4)

  await Editor.openCompletion()
  const completion = Locator('.EditorCompletionItem')
  await expect(completion).toHaveText('v26.7.0')
  await EditorCompletion.selectIndex(0)

  const token = Locator('.Token.Unknown')
  await expect(token).toHaveText('v26.7.0')
}
