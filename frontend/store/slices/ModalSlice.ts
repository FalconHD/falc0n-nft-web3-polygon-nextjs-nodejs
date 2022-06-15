import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactElement } from "react";

export interface modalType {
  template: string;
  status: "open" | "close";
  props: any;
  action?: string | null;
  bridge?: any | null;
  redirect?: string | null;
}

const initialState: modalType = {
  template: "",
  status: "close",
  props: {},
  action: null,
  bridge: null,
  redirect: null,
};

export const modalState = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.template = action.payload;
      state.status = "open";
    },
    modalProps: (state, action: PayloadAction<any>) => {
      state.props = action.payload;
    },
    closeModal: (state) => {
      state.status = "close";
      state.template = "";
    },
    setAction: (state, action: PayloadAction<string>) => {
      state.action = action.payload;
    },
    setBridge: (state, action: PayloadAction<any>) => {
      state.bridge = action.payload;
    },
    setRedirection: (state, action: PayloadAction<string>) => {
      state.redirect = action.payload;
    },
    resetModal: (state) => {
      (state.template = ""),
        (state.status = "close"),
        (state.props = {}),
        (state.action = null),
        (state.bridge = null),
        (state.redirect = null);
    },
  },
});

export const {
  openModal,
  closeModal,
  modalProps,
  setAction,
  setBridge,
  resetModal,
  setRedirection,
} = modalState.actions;

export const modalReducer = modalState.reducer;
