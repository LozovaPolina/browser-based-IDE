import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux";

type DispatchFunction = () => AppDispatch;
export const useTypedDispatch: DispatchFunction = useDispatch;
