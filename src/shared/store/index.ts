import { configureStore } from "@reduxjs/toolkit";

import shapeReducer, { shapeSlice } from "./ShapeSlice";
import uiReducer, { uiSlice } from "./UISlice";

export const store = configureStore({
  reducer: {
    shape: shapeReducer,
    ui: uiReducer,
  },
});

export const actions = {
  ...shapeSlice.actions,
  ...uiSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
