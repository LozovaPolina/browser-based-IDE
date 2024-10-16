import React, { ReactNode } from "react";
import { Cell } from "../types";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";
import styles from "./cell-list-item.module.css";
import AddCell from "./add-cell";

type CellListItemProps = {
  cell: Cell;
};

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  console.log(cell);
  const content: ReactNode =
    cell.type === "code" ? (
      <>
        <div className={styles["action-bar-wrapper"]}>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    ) : (
      <>
        <ActionBar id={cell.id} />
        <TextEditor cell={cell} />{" "}
      </>
    );
  return (
    <>
      <div className={`${styles["cell-list-item"]}`}>{content}</div>
    </>
  );
};

export default CellListItem;
