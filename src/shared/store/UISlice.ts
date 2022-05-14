import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  hovering: boolean;
}

const initialState: UIState = {
  hovering: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    hover: (state) => {
      state.hovering = true;
    },
    unhover: (state) => {
      state.hovering = false;
    },
  },
});

/**
 * Selectors
 */

/**
 * Reducer
 */
export default uiSlice.reducer;
