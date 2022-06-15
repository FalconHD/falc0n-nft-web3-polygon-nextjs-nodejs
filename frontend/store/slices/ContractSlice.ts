import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactElement } from "react";

export interface modalType {
  abi: null | any;
  address: string;
  user: any | null;
}

const initialState: modalType = {
  abi: "",
  address: "",
  user: null,
};

export const ContractState = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setContract: (
      state,
      action: PayloadAction<{ abi: string; address: string }>
    ) => {
      state.abi = action.payload.abi;
      state.address = action.payload.address;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setContract,setUser } = ContractState.actions;

export const ContractReducer = ContractState.reducer;
