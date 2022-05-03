import { configureStore } from "@reduxjs/toolkit";

import shapeReducer, { shapeSlice } from "./ShapeSlice";

export const store = configureStore({
  reducer: {
    shape: shapeReducer,
  },
});

export const actions = {
  ...shapeSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
