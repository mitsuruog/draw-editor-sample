import { BasicShape, BasicShapeProps } from "./basic";
import { FlowchartShape, FlowchartShapeProps } from "./flowchart";

export type DrawObject = LineObject | TextObject | ShapeObject | ImageObject;

export type ObjectBase = {
  id: string;
  name: string;
  x: number;
  y: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  fillColor?: string;
  strokeColor?: string;
};

export type LineObject = {
  type: "line";
  points: number[];
} & ObjectBase;

export type ShapeObject = {
  type: "shape";
} & ObjectBase;

export type TextObject = {
  type: "text";
  text?: string;
} & ObjectBase;

export type ImageObject = {
  type: "image";
  uri?: string;
} & ObjectBase;

export const STROKE_WIDTH = 1;
export const ANCHOR_SIZE = 10;
export const ANCHOR_STROKE = "rgb(0, 161, 255)";
export const DEFAULT_LINE_POINTS = [50, 50, 150, 150];

export const Shapes = { ...BasicShape, ...FlowchartShape };
