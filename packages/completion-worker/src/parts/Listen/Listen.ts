import { initializeEditorWorker } from '../InitializeEditorWorker/InitializeEditorWorker.ts'

export const listen = async (): Promise<void> => {
  await initializeEditorWorker()
}
