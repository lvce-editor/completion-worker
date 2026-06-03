import { initializeEditorWorker } from '../InitializeEditorWorker/InitializeEditorWorker.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'

export const listen = async (): Promise<void> => {
  await Promise.all([initializeEditorWorker(), initializeExtensionManagementWorker()])
}
