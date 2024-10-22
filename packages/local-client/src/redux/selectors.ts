import { RootState } from "./index";
import { Cell } from "../types";

export const selectCellsOrder = (state: RootState) => state.cells.order;
export const selectCellsData = (state: RootState) => state.cells.data;
export const selectBundlesData = (state: RootState, id: Cell["id"]) =>
  state.bundles[id];
