import {basicSetup} from "codemirror"
import {EditorView, keymap} from "@codemirror/view"
import {EditorState} from "@codemirror/state"
import {indentWithTab} from "@codemirror/commands"
import { python } from "@codemirror/lang-python"

const extensions = [basicSetup, keymap.of([indentWithTab]), python()]
export default function initEditor() {
  let doc = `def ${window.challenge.function_name}(${window.challenge.function_args.join(", ")}):\n\treturn None`;
  window.editor_view = new EditorView({
    doc,
    extensions,
    parent: document.querySelector("#code-editor")
  })
}

export function setCode(text) {
  window.editor_view.setState(EditorState.create({doc: text, extensions}))
}
export function getCode() {
  return window.editor_view.state.doc.toString();
}
