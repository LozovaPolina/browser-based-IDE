import { ActionTypes } from "../action-types";
import { CellTypes } from "../../types";

type Direction = "up" | "down";

type MoveCellAction = {
  type: ActionTypes.MOVE_CELL;
  payload: { id: string; direction: Direction };
};
type DeleteCellAction = {
  type: ActionTypes.DELETE_CELL;
  payload: string;
};
type InsertCellAfterAction = {
  type: ActionTypes.INSERT_CELL_AFTER;
  payload: { id: string | null; type: CellTypes };
};
type UpdateCellAction = {
  type: ActionTypes.UPDATE_CELL;
  payload: { id: string; content: string };
};
type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction;

export {
  type MoveCellAction,
  type DeleteCellAction,
  type InsertCellAfterAction,
  type UpdateCellAction,
  type Action,
};
