import React, { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { type Cell } from "../types";
import { useActions } from "../hooks/use-action";
import bundle from "../bundler";

type CodeCellProps = {
  cell: Cell;
};
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { id, content } = cell;
  const { updateCell, createBundle } = useActions();

  useEffect(() => {
    let timer = setTimeout(async () => {
      if (!bundle) {
        createBundle(id, content);
        return;
      }
      createBundle(id, content);
    }, 750);

    return () => clearTimeout(timer);
  }, [content, id, createBundle]);

  return (
    <Resizable direction={"vertical"}>
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction={"horizontal"}>
          <CodeEditor
            onChange={(content) => updateCell({ id, content })}
            initialValue={content}
          />
        </Resizable>
        <Preview cellId={id} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
