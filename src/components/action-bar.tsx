import React from "react";
import { useActions } from "../hooks/use-action";
import styles from "./action-bar.module.css";

type ActionBarProps = { id: string };
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className={`${styles["action-bar"]}`}>
      <button
        className={"button is-primary is-small"}
        onClick={() => moveCell({ id, direction: "up" })}
      >
        <span className={"icon"}>
          <i className={"fas fa-arrow-up"} />
        </span>
      </button>
      <button
        className={"button is-primary  is-small"}
        onClick={() => moveCell({ id, direction: "down" })}
      >
        <span className={"icon"}>
          <i className={"fas fa-arrow-down"} />
        </span>
      </button>
      <button
        className={"button is-primary is-small"}
        onClick={() => deleteCell(id)}
      >
        <span className={"icon"}>
          <i className={"fas  fa-times"} />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
