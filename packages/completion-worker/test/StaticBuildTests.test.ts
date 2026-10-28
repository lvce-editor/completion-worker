import type { Dirent } from 'node:fs'
import { expect, test } from '@jest/globals'
import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const staticRoot = join(root, '.tmp', 'static')
const testName = 'editor.completion-click'

test('static build exports the completion e2e index, test module, and fixture', async () => {
  const indexPath = join(staticRoot, 'tests', 'index.html')
  const index = await readFile(indexPath, 'utf8')

  expect(index).toContain(`./${testName}.html`)
  await access(join(staticRoot, 'tests', `${testName}.html`))

  const staticEntries = await readdir(staticRoot, { withFileTypes: true })
  const commitHash = await Promise.any(
    staticEntries
      .filter((entry: Readonly<Dirent>) => entry.isDirectory() && entry.name !== 'tests')
      .map(async (entry: Readonly<Dirent>) => {
        const testModulePath = join(staticRoot, entry.name, 'packages', 'extension-host-worker-tests', 'src', `${testName}.js`)
        await access(testModulePath)
        return entry.name
      }),
  )

  await access(join(staticRoot, commitHash, 'packages', 'extension-host-worker-tests', 'fixtures', 'editor.completion-click', 'fileMap.json'))

  const testPage = await readFile(join(staticRoot, 'tests', `${testName}.html`), 'utf8')
  expect(testPage).toContain(`/completion-worker/${commitHash}/`)
})
