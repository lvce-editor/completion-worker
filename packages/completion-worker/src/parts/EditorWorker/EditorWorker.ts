import { EditorWorker } from '@lvce-editor/rpc-registry'

export const {
  activateByEvent,

  applyEdit,
  closeWidget,
  getLines,
  getOffsetAtCursor,
  getPositionAtCursor,
  getSelections,
  getWordAtOffset2,

  getWordBefore,
  sendMessagePortToExtensionHostWorker,
  set,
} = EditorWorker
