import { ActionTypes } from "../action-types";

type MoveCellAction = {
  type: ActionTypes.MOVE_CELL;
  payload: { id: string; direction: "up" | "down" };
};
type DeleteCellAction = {
  type: ActionTypes.DELETE_CELL;
  payload: string;
};
type InsertCellBeforeAction = {
  type: ActionTypes.INSERT_CELL_BEFORE;
  payload: { id: string; type: "code" | "text" };
};
type UpdateCellAction = {
  type: ActionTypes.UPDATE_CELL;
  payload: { id: string; content: string };
};

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction;
