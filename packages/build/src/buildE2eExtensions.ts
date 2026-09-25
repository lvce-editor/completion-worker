import { build } from 'esbuild'
import { join } from 'node:path'
import { root } from './root.ts'

export const buildE2eExtensions = async (): Promise<void> => {
  const extensionPath = join(root, 'packages', 'e2e', 'fixtures', 'editor.completion-many-results')
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
