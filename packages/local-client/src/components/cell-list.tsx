import React, { Fragment, ReactNode } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { selectCellsData, selectCellsOrder } from "../redux/selectors";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import styles from "./cell-list.module.css";
import ErrorBlock from "./UI/error-block";

const CellList: React.FC = () => {
  const order = useTypedSelector(selectCellsOrder);
  const cells = useTypedSelector(selectCellsData);

  const orderedCells = order.map((id) => cells[id]);
  console.log(orderedCells);

  let content: ReactNode;

  if (orderedCells.length <= 0) {
    content = (
      <>
        <ErrorBlock
          message={"Oops. Your cells list is empty."}
          description={"Create new cell"}
        />
        <AddCell prevCellId={null} visible={true} />
      </>
    );
  } else if (orderedCells.length > 0) {
    content = (
      <>
        <AddCell prevCellId={null} />
        {orderedCells.map((cell) => (
          <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell prevCellId={cell.id} />
          </Fragment>
        ))}
      </>
    );
  }
  return <div className={styles["cell-list"]}>{content}</div>;
};

export default CellList;
