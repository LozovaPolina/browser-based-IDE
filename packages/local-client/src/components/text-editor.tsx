import React, { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { Cell } from "../types";
import { useActions } from "../hooks/use-action";

type TextEditorProp = {
  cell: Cell;
};
const TextEditor: React.FC<TextEditorProp> = ({ cell }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateCell } = useActions();
  const { id, content } = cell;

  const MDEditorWrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        MDEditorWrapperRef.current &&
        MDEditorWrapperRef.current.contains(e.target as Node) &&
        e.target
      ) {
        return;
      }
      setIsEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () =>
      document.removeEventListener("click", listener, { capture: true });
  }, []);

  if (isEditing) {
    return (
      <div className={"text-editor"} ref={MDEditorWrapperRef}>
        <MDEditor
          value={content}
          onChange={(content = "") => updateCell({ id, content })}
        />
      </div>
    );
  }
  return (
    <div className={"text-editor card"} onClick={() => setIsEditing(true)}>
      <div className={"card-content"}>
        <MDEditor.Markdown source={content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
