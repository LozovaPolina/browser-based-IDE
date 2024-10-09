import React, { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";

const TextEditor: React.FC = () => {
  const [value, setValue] = useState("New Markdown");
  const [isEditing, setIsEditing] = useState(false);

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
        <MDEditor value={value} onChange={(value = "") => setValue(value)} />
      </div>
    );
  }
  return (
    <div className={"text-editor card"} onClick={() => setIsEditing(true)}>
      <div className={"card-content"}>
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
