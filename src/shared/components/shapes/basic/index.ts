import { Circle, CircleProps } from "./Circle";
import { Image, ImageProps } from "./Image";
import { Rectangle, RectangleProps } from "./Rectangle";
import { Line, LineProps } from "./Line";
//export * from "./Text";

export type BasicShapeProps =
  | CircleProps
  | ImageProps
  | RectangleProps
  | LineProps;

export const BasicShape = { Circle, Image, Rectangle, Line };
