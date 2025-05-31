import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

// TODO add tests for this
export const activateByEvent = async (event: string): Promise<void> => {
  // @ts-ignore
  await EditorWorker.invoke('ActivateByEvent.activateByEvent', event)
}
