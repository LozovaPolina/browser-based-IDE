import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../../types/cell";

type CellsState = {
  loading: boolean;
  error: string | null;
  order: Cell["id"][];
  data: {
    [key: Cell["id"]]: Cell;
  };
};

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};
const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

const reducer = (state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CELL: {
      const { content, id } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };
    }

    case ActionTypes.DELETE_CELL: {
      const updatedOrder = state.order.filter((id) => id !== action.payload);
      const updatedData = { ...state.data };
      delete updatedData[action.payload];

      return { ...state, order: updatedOrder, data: updatedData };
    }

    case ActionTypes.MOVE_CELL: {
      const { direction, id } = action.payload;
      const index = state.order.findIndex((itemId) => itemId === id);

      if (index === -1) {
        console.error("Cannot find cell");
        return state;
      }

      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      const orderArray = [...state.order];
      orderArray[index] = orderArray[targetIndex];
      orderArray[targetIndex] = action.payload.id;

      return {
        ...state,
        order: orderArray,
      };
    }

    case ActionTypes.INSERT_CELL_BEFORE: {
      const newCell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };
      const orderArray = [...state.order];
      const index = state.order.findIndex((id) => id === action.payload.id);

      if (index === -1) {
        orderArray.push(newCell.id);
      } else {
        orderArray.splice(index, 0, newCell.id);
      }

      return {
        ...state,
        data: { ...state.data, [newCell.id]: { ...newCell } },
        order: orderArray,
      };
    }
    default:
      return state;
  }
};

export default reducer;
