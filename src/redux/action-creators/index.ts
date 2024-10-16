import { ActionTypes } from "../action-types";
import {
  type DeleteCellAction,
  type InsertCellAfterAction,
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
  payload: InsertCellAfterAction["payload"],
): InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: { ...payload },
  };
};
