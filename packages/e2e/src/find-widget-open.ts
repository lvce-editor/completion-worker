import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.editor-completion-worker'

// TODO figure out why test is flaky
export const skip = true

export const test: Test = async ({ FileSystem, Workspace, Main, Editor, Locator, expect, FindWidget }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/file1.txt`,
    `content 1
content 2`,
  )
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/file1.txt`)

  // act
  await Editor.setSelections(new Uint32Array([0, 0, 0, 7]))
  await Editor.openFindWidget()

  // assert
  const completionInput = Locator('.FindWidget .MultilineInputBox')
  await expect(completionInput).toBeVisible()
  await expect(completionInput).toHaveValue('content')
  const completionMatchCount = Locator(`.FindWidgetMatchCount`)
  await expect(completionMatchCount).toBeVisible()
  await expect(completionMatchCount).toHaveText('1 of 2')

  // act
  await FindWidget.focusNext()

  // assert
  await expect(completionMatchCount).toHaveText('2 of 2')
  const editorSelection = Locator('.EditorSelection')
  await expect(editorSelection).toHaveCSS('top', '20px')
  await expect(editorSelection).toHaveCSS('width', /^(65|66|67|68|69).*?px$/)

  // act
  await FindWidget.setValue('content-not-found')

  // assert
  await expect(completionMatchCount).toHaveText('No Results')
  const buttonPreviousMatch = Locator('[title="Previous Match"]')
  await expect(buttonPreviousMatch).toHaveAttribute('disabled', '')
  const buttonNextMatch = Locator('[title="Next Match"]')
  await expect(buttonNextMatch).toHaveAttribute('disabled', '')
}
