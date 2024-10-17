import { ActionTypes } from "../action-types";
import {
  type DeleteCellAction,
  type InsertCellAfterAction,
  type MoveCellAction,
  type UpdateCellAction,
} from "../actions";

const updateCell = (payload: UpdateCellAction["payload"]): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: { ...payload },
  };
};
const deleteCell = (payload: DeleteCellAction["payload"]): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload,
  };
};

const moveCell = (payload: MoveCellAction["payload"]): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: { ...payload },
  };
};

const insertCellAfterAction = (
  payload: InsertCellAfterAction["payload"],
): InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: { ...payload },
  };
};
export { updateCell, deleteCell, moveCell, insertCellAfterAction };
