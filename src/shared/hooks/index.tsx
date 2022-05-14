import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./useLine";
export * from "./useHover";
export * from "./useKeyPress";
export * from "./useSelect";
export * from "./useShape";
