import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generate } from "shortid";

import type { RootState } from ".";
import { Shape } from "../models";

interface ShapesState {
  shapes: Shape[];
  selectedShapeId?: string;
}

const initialState: ShapesState = {
  shapes: [],
};

export const shapeSlice = createSlice({
  name: "shape",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ type: string }>) => {
      state.shapes.push({ id: generate(), type: action.type });
    },
    select: (state, action) => {},
    unselect: (state, action) => {},
  },
});

/**
 * Selectors
 */

/**
 * Reducer
 */
export default shapeSlice.reducer;
