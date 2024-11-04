import { ActionTypes } from "../action-types";
import {
  Action,
  type DeleteCellAction,
  type InsertCellAfterAction,
  type MoveCellAction,
  type UpdateCellAction,
} from "../actions";
import { Dispatch } from "redux";
import { Cell } from "../../types";

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

const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.FETCH_CELLS });

    try {
      const res = await fetch("/cells");
      if (!res.ok) {
        throw new Error("Could not fetch the data. Please try again.");
      }
      const { data }: { data: Cell[] } = await res.json();

      dispatch({ type: ActionTypes.FETCH_CELLS_COMPLETE, payload: data });
    } catch (e) {
      if (e instanceof Error) {
        dispatch({
          type: ActionTypes.FETCH_CELLS_ERROR,
          payload: e.message,
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_CELLS_ERROR,
          payload: "Something went wrong...",
        });
      }
    }
  };
};
export { updateCell, deleteCell, moveCell, insertCellAfterAction };
