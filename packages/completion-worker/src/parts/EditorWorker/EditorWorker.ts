import { EditorWorker } from '@lvce-editor/rpc-registry'

export const {
  set,

  sendMessagePortToExtensionHostWorker,
  activateByEvent,
  applyEdit,
  closeWidget,
  getLines,
  getPositionAtCursor,
  getSelections,

  getOffsetAtCursor,
  getWordAtOffset2,
  getWordBefore,
} = EditorWorker
