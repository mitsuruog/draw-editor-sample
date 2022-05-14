import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generate } from "shortid";
import { actions } from ".";

import { DrawObject } from "../components/shapes";

interface ShapesState {
  shapes: DrawObject[];
  selectedShapeId?: string;
}

const initialState: ShapesState = {
  /**
   * Common
   * x, y, fill, stroke
   *
   * Line
   * points
   *
   * Shape
   * scaleX, scaleY, rotate
   *
   * Text
   * text
   */
  shapes: [],
};

export const shapeSlice = createSlice({
  name: "shape",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Pick<DrawObject, "name" | "type">>) => {
      const id = generate();
      //@ts-ignore
      state.shapes.push({
        id,
        ...action.payload,
        x: 50,
        y: 50,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      });
      state.selectedShapeId = id;
    },
    change: (state, action: PayloadAction<DrawObject>) => {
      state.shapes = state.shapes.map((shape) =>
        shape.id === action.payload.id ? { ...shape, ...action.payload } : shape
      );
    },
    delete: (state, action: PayloadAction<{ id: string }>) => {
      state.shapes = state.shapes.filter(
        (shape) => shape.id !== action.payload.id
      );
      state.selectedShapeId = undefined;
    },
    select: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedShapeId = action.payload.id;
    },
    unselect: (state) => {
      state.selectedShapeId = undefined;
    },
  },
});

/**
 * Selectors
 */

/**
 * Reducer
 */
export default shapeSlice.reducer;
