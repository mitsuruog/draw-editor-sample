import { Arrow, ArrowProps } from "./Arrow";
import { DashedArrow, DashedArrowProps } from "./DashedArrow";
import { DoubleArrow, DoubleArrowProps } from "./DoubleArrow";
import { Circle, CircleProps } from "./Circle";
import { Ellipse, EllipseProps } from "./Ellipse";
import { Image, ImageProps } from "./Image";
import { Rectangle, RectangleProps } from "./Rectangle";
import { RoundedRectangle, RoundedRectangleProps } from "./RoundedRectangle";
import { Line, LineProps } from "./Line";
import { DashedLine, DashedLineProps } from "./DashedLine";
import { DottedLine, DottedLineProps } from "./DottedLine";
//export * from "./Text";

export type BasicShapeProps =
  | ArrowProps
  | DashedArrowProps
  | DoubleArrowProps
  | CircleProps
  | EllipseProps
  | ImageProps
  | RectangleProps
  | RoundedRectangleProps
  | LineProps
  | DashedLineProps
  | DottedLineProps;

export const BasicShape = {
  Arrow,
  DashedArrow,
  DoubleArrow,
  Circle,
  Image,
  Rectangle,
  Line,
  DashedLine,
  DottedLine,
  RoundedRectangle,
  Ellipse,
};
