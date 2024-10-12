import { RootState } from "./index";

export const selectCellsOrder = (state: RootState) => state.cells.order;
export const selectCellsData = (state: RootState) => state.cells.data;
