import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../../types";

type BundlesState = {
  [key: Cell["id"]]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
};
const initialState: BundlesState = {};

const reducer = (state: BundlesState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.BUNDLE_START: {
      return {
        ...state,
        [action.payload.cellId]: { loading: true, code: "", err: "" },
      };
    }
    case ActionTypes.BUNDLE_COMPLETE: {
      const { code, err } = action.payload.bundle;
      return {
        ...state,
        [action.payload.cellId]: {
          loading: false,
          code,
          err,
        },
      };
    }
    default:
      return state;
  }
};
export default reducer;
