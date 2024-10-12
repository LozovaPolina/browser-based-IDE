import React from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { selectCellsData, selectCellsOrder } from "../redux/selectors";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
  const order = useTypedSelector(selectCellsOrder);
  const cells = useTypedSelector(selectCellsData);

  const orderedCells = order.map((id) => cells[id]);
  console.log(orderedCells);
  return (
    <div>
      {orderedCells.length <= 0 && (
        <div>
          <h2>Oops. Your cells list is empty.</h2>
          <p>Create new cell</p>
        </div>
      )}

      {orderedCells.length > 0 &&
        orderedCells.map((cell) => <CellListItem key={cell.id} cell={cell} />)}
    </div>
  );
};

export default CellList;
