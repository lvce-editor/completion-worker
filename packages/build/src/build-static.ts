import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'
import { cp } from 'node:fs/promises'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/completion-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
})

await cp(
  join(root, '.tmp', 'dist', 'dist', 'completionWorkerMain.js'),
  join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'node_modules', '@lvce-editor', 'completion-worker', 'dist', 'completionWorkerMain.js'),
)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
