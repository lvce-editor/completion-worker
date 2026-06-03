<<<<<<< HEAD
import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
=======
import { initializeEditorWorker } from '../InitializeEditorWorker/InitializeEditorWorker.ts'
>>>>>>> origin/main

export const listen = async (): Promise<void> => {
  await initializeEditorWorker()
}
