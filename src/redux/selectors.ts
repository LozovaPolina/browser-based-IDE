import { RootState } from "./index";
import { Cell } from "../types";

export const selectCellsOrder = (state: RootState) => state.cells.order;
export const selectCellsData = (state: RootState) => state.cells.data;
export const selectBundlesData = (state: RootState, id: Cell["id"]) =>
  state.bundles[id];
export const selectCumulativeCode = (state: RootState, cellId: Cell["id"]) => {
  const { data, order } = state.cells;

  const orderedCells = order.map((id) => data[id]);

  const cumulativeCode = [];

  for (const cell of orderedCells) {
    if (cell.type === "code") cumulativeCode.push(cell.content);
    if (cell.id === cellId) break;
  }

  return cumulativeCode;
};
