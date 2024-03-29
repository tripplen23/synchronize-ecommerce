import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppState, AppDispatch } from "./store";

// TODO: Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
