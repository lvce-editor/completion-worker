import { EditorWorker } from '@lvce-editor/rpc-registry'

export const {
  invoke,
  set,
  dispose,
  sendMessagePortToExtensionHostWorker,
  activateByEvent,
  applyEdit,
  closeWidget,
  getLines,
  getPositionAtCursor,
  getSelections,
  getWordAt,
  getOffsetAtCursor,
  getWordAtOffset2,
  getWordBefore,
  invokeAndTransfer,
} = EditorWorker
