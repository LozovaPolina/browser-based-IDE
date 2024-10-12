import { ActionTypes } from "../action-types";
import { CellTypes } from "../cell";

type Direction = "up" | "down";

type MoveCellAction = {
  type: ActionTypes.MOVE_CELL;
  payload: { id: string; direction: Direction };
};
type DeleteCellAction = {
  type: ActionTypes.DELETE_CELL;
  payload: string;
};
type InsertCellBeforeAction = {
  type: ActionTypes.INSERT_CELL_BEFORE;
  payload: { id: string | null; type: CellTypes };
};
type UpdateCellAction = {
  type: ActionTypes.UPDATE_CELL;
  payload: { id: string; content: string };
};
type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction;

export {
  type MoveCellAction,
  type DeleteCellAction,
  type InsertCellBeforeAction,
  type UpdateCellAction,
  type Action,
};
