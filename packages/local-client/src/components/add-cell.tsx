import React from "react";
import styles from "./add-cell.module.css";
import { useActions } from "../hooks/use-action";

type AddCellProps = {
  prevCellId: string | null;
  visible?: boolean;
};

const AddCell: React.FC<AddCellProps> = ({ prevCellId, visible = false }) => {
  const { insertCellAfterAction } = useActions();

  return (
    <div
      className={`${styles["add-cell"]} ${visible ? styles["visible"] : ""}`}
    >
      <div className={styles["add-buttons"]}>
        <button
          className={"button is-primary is-rounded is-small"}
          onClick={() =>
            insertCellAfterAction({ id: prevCellId, type: "code" })
          }
        >
          <span className={"icon is-small"}>
            <i className={"fas fa-plus"} />
          </span>

          <span>Code</span>
        </button>
        <button
          className={"button is-rounded is-small "}
          onClick={() =>
            insertCellAfterAction({ id: prevCellId, type: "text" })
          }
        >
          <span className={"icon is-small"}>
            <i className={"fas fa-plus"} />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className={styles["divider"]}></div>
    </div>
  );
};

export default AddCell;
