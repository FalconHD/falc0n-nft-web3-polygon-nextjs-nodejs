import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { modalReducer, ContractReducer } from "@/slices";

export const store = configureStore({
  reducer: {
    Modal: modalReducer,
    contract: ContractReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
