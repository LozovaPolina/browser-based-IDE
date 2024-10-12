import React, { ReactNode } from "react";
import { Cell } from "../types";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";

type CellListItemProps = {
  cell: Cell;
};

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  console.log(cell);
  const content: ReactNode =
    cell.type === "code" ? <CodeCell /> : <TextEditor />;
  return <div>{content}</div>;
};

export default CellListItem;
