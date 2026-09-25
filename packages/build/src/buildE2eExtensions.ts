import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { build } from 'esbuild'
import { root } from './root.ts'

export const buildE2eExtensions = async (): Promise<void> => {
  const fixturesPath = join(root, 'packages', 'e2e', 'fixtures')
  const fixtures = await readdir(fixturesPath, { withFileTypes: true })
  for (const fixture of fixtures) {
    if (!fixture.isDirectory()) {
      continue
    }
    const extensionPath = join(fixturesPath, fixture.name)
    const manifest = JSON.parse(await readFile(join(extensionPath, 'extension.json'), 'utf8'))
    if (manifest.isolated !== true) {
      continue
    }
    await build({
      bundle: true,
      entryPoints: [join(extensionPath, 'main.js')],
      external: ['electron', 'node:*'],
      format: 'esm',
      outfile: join(extensionPath, 'dist', 'main.js'),
      platform: 'browser',
      target: 'esnext',
    })
  }
}
