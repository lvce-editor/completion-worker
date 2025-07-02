import { terminate } from '@lvce-editor/viewlet-registry'
import * as Close from '../Close/Close.ts'
import * as WrapCommand from '../CompletionStates/CompletionStates.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Dispose from '../Dispose/Dispose.ts'
import * as FocusFirst from '../EditorCompletionFocusFirst/EditorCompletionFocusFirst.ts'
import * as FocusIndex from '../EditorCompletionFocusIndex/EditorCompletionFocusIndex.ts'
import * as EditorCompletionFocusNext from '../EditorCompletionFocusNext/EditorCompletionFocusNext.ts'
import * as EditorCompletionFocusPrevious from '../EditorCompletionFocusPrevious/EditorCompletionFocusPrevious.ts'
import * as EditorCompletionOpenDetails from '../EditorCompletionOpenDetails/EditorCompletionOpenDetails.ts'
import * as SelectCurrent from '../EditorCompletionSelectCurrent/EditorCompletionSelectCurrent.ts'
import * as SelectIndex from '../EditorCompletionSelectIndex/EditorCompletionSelectIndex.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleEditorDeleteLeft from '../HandleEditorDeleteLeft/HandleEditorDeleteLeft.ts'
import * as HandleEditorType from '../HandleEditorType/HandleEditorType.ts'
import * as HandleWheel from '../HandleWheel/HandleWheel.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Render2 from '../Render2/Render2.ts'

export const commandMap = {
  'Completions.close': WrapCommand.wrapCommand(Close.close),
  'Completions.create': Create.create,
  'Completions.diff2': Diff2.diff2,
  'Completions.dispose': Dispose.dispose,
  'Completions.focusFirst': WrapCommand.wrapCommand(FocusFirst.focusFirst),
  'Completions.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'Completions.focusNext': WrapCommand.wrapCommand(EditorCompletionFocusNext.focusNext),
  'Completions.focusPrevious': WrapCommand.wrapCommand(EditorCompletionFocusPrevious.focusPrevious),
  'Completions.getCommandIds': GetCommandIds.getCommandIds,
  'Completions.getKeyBindings': GetKeyBindings.getKeyBindings,
  'Completions.handleEditorDeleteLeft': WrapCommand.wrapCommand(HandleEditorDeleteLeft.handleEditorDeleteLeft),
  'Completions.handleEditorType': WrapCommand.wrapCommand(HandleEditorType.handleEditorType),
  'Completions.handleWheel': WrapCommand.wrapCommand(HandleWheel.handleWheel),
  'Completions.initialize': Initialize.initialize,
  'Completions.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'Completions.openDetails': WrapCommand.wrapCommand(EditorCompletionOpenDetails.openDetails),
  'Completions.render2': Render2.render2,
  'Completions.selectCurrent': WrapCommand.wrapCommand(SelectCurrent.selectCurrent),
  'Completions.selectIndex': WrapCommand.wrapCommand(SelectIndex.selectIndex),
  'Completions.terminate': terminate,
}
