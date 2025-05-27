import * as WrapCommand from '../CompletionStates/CompletionStates.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as FocusFirst from '../EditorCompletionFocusFirst/EditorCompletionFocusFirst.ts'
import * as FocusIndex from '../EditorCompletionFocusIndex/EditorCompletionFocusIndex.ts'
import * as EditorCompletionFocusNext from '../EditorCompletionFocusNext/EditorCompletionFocusNext.ts'
import * as EditorCompletionFocusPrevious from '../EditorCompletionFocusPrevious/EditorCompletionFocusPrevious.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as HandleEditorType from '../HandleEditorType/HandleEditorType.ts'
import * as Initialize from '../Initialize/Initialize.ts'
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
  'Completions.initialize': Initialize.initialize,
  'Completions.handleEditorType': HandleEditorType.handleEditorType,
  'Completions.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'Completions.focusFirst': WrapCommand.wrapCommand(FocusFirst.focusFirst),
  'Completions.focusNext': WrapCommand.wrapCommand(EditorCompletionFocusNext.focusNext),
  'Completions.focusPrevious': WrapCommand.wrapCommand(EditorCompletionFocusPrevious.focusPrevious),
}
