import React, { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { type Cell } from "../types";
import { useActions } from "../hooks/use-action";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { selectBundlesData } from "../redux/selectors";
import ProgressBar from "./UI/progress-bar";

type CodeCellProps = {
  cell: Cell;
};
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { id, content } = cell;
  const { updateCell, createBundle } = useActions();

  const bundleItem = useTypedSelector((state) => {
    return selectBundlesData(state, cell.id);
  });

  useEffect(() => {
    if (!bundleItem) {
      createBundle(id, content);
      return;
    }

    let timer = setTimeout(async () => {
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
        {!bundleItem || bundleItem.loading ? (
          <ProgressBar />
        ) : (
          <Preview code={bundleItem.code} err={bundleItem.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
