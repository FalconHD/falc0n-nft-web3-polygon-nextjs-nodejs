import {
  openModal,
  modalProps,
  closeModal as close,
  setAction,
} from "@/slices";
import React, { useState } from "react";
import { useSlice } from "./reduxHooks";

export const useModal = () => {
  const [modalSate, setModalState] = useState({});
  const [modalState, dispatcher] = useSlice("Modal");

  const openModalWithData = (template: string, data?: any, action?: string) => {
    dispatcher(openModal(template));
    dispatcher(modalProps(data));
    action && dispatcher(setAction(action));
  };

  const closeModal = () => {
    dispatcher(close());
  };

  return [modalState, openModalWithData, closeModal];
};
