import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { CompletionState } from '../CompletionState/CompletionState.ts'

export const { get, set, wrapCommand, dispose } = ViewletRegistry.create<CompletionState>()
