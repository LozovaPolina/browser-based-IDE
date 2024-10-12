import { ActionTypes } from "../action-types";
import {
  type DeleteCellAction,
  type InsertCellBeforeAction,
  type MoveCellAction,
  type UpdateCellAction,
} from "../actions";

export const updateCell = (
  payload: UpdateCellAction["payload"],
): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: { ...payload },
  };
};
export const deleteCell = (
  payload: DeleteCellAction["payload"],
): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload,
  };
};

export const moveCell = (
  payload: MoveCellAction["payload"],
): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: { ...payload },
  };
};

export const insertCellBeforeAction = (
  payload: InsertCellBeforeAction["payload"],
): InsertCellBeforeAction => {
  return {
    type: ActionTypes.INSERT_CELL_BEFORE,
    payload: { ...payload },
  };
};
