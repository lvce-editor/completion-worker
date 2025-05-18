import * as WrapCommand from '../CompletionStates/CompletionStates.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as Terminate from '../Terminate/Terminate.ts'

export const commandMap = {
  'Completions.create': Create.create,
  'Completions.diff2': Diff2.diff2,
  'Completions.getCommandIds': GetCommandIds.getCommandIds,
  'Completions.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'Completions.render2': Render2.render2,
  'Completions.terminate': Terminate.terminate,
}
