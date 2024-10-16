import React, { Fragment, ReactNode } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { selectCellsData, selectCellsOrder } from "../redux/selectors";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
  const order = useTypedSelector(selectCellsOrder);
  const cells = useTypedSelector(selectCellsData);

  const orderedCells = order.map((id) => cells[id]);
  console.log(orderedCells);

  let content: ReactNode;

  if (orderedCells.length <= 0) {
    content = (
      <div>
        <h2>Oops. Your cells list is empty.</h2>
        <p>Create new cell</p>
        <AddCell nextCellId={null} visible={true} />
      </div>
    );
  } else if (orderedCells.length > 0) {
    content = (
      <>
        {orderedCells.map((cell) => (
          <Fragment key={cell.id}>
            <AddCell nextCellId={cell.id} />
            <CellListItem cell={cell} />
          </Fragment>
        ))}
        <AddCell nextCellId={null} />
      </>
    );
  }
  return <div>{content}</div>;
};

export default CellList;
