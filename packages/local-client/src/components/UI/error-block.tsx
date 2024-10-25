import React from "react";
import styles from "./error-block.module.css";

type ErrorBlockProps = {
  message: string;
  description?: string;
};
const ErrorBlock: React.FC<ErrorBlockProps> = ({ message, description }) => {
  return (
    <div className={`${styles["error-block"]} primary`}>
      <h2>{message}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default ErrorBlock;
