import React, { useEffect, useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { type Cell } from "../types";
import { useActions } from "../hooks/use-action";

type CodeCellProps = {
  cell: Cell;
};
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, serErr] = useState("");
  const { id, content } = cell;
  const { updateCell } = useActions();
  useEffect(() => {
    let timer = setTimeout(async () => {
      const output = await bundle(content);
      console.log(output);

      serErr(output.err);
      setCode(output.code);
    }, 700);

    return () => clearTimeout(timer);
  }, [content]);

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
        <Preview code={code} bundlingError={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
