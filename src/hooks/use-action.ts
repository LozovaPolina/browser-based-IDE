import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useTypedDispatch } from "./use-typed-dispatch";

export const useActions = () => {
  const dispatch = useTypedDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
