import React, { useEffect, useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, serErr] = useState("");

  useEffect(() => {
    let timer = setTimeout(async () => {
      const output = await bundle(input);
      console.log(output);

      serErr(output.err);
      setCode(output.code);
    }, 700);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <Resizable direction={"vertical"}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction={"horizontal"}>
          <CodeEditor
            onChange={(value) => setInput(value)}
            initialValue="const i = 1"
          />
        </Resizable>
        <Preview code={code} bundlingError={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
