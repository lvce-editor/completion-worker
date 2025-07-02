import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 450_000

export const workerPath = join(root, '.tmp/dist/dist/completionWorkerMain.js')

export const playwrightPath = new URL('../../e2e/node_modules/playwright/index.mjs', import.meta.url).toString()

export const instantiations = 5000

export const instantiationsPath = join(root, 'packages', 'completion-worker')
