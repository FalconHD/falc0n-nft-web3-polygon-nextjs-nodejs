import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSlice = (targetedSlice: string): [any, AppDispatch] => {
  // @ts-ignore
  const slice = useAppSelector((state) => state[targetedSlice]);
  const dispatch = useAppDispatch();
  return [slice, dispatch];
};
