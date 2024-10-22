import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useTypedDispatch } from "./use-typed-dispatch";
import { useMemo } from "react";

export const useActions = () => {
  const dispatch = useTypedDispatch();

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
