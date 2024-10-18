import React from "react";
import styles from "./progress-bar.module.css";

const ProgressBar = () => {
  return (
    <div className={styles["progress-wrapper"]}>
      <div className={styles["progress-cover"]}>
        <progress max="100" className={"progress is-small is-primary"}>
          Loading
        </progress>
      </div>
    </div>
  );
};

export default ProgressBar;
