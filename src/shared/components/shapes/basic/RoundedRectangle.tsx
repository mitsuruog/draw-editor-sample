import { VoidFunctionComponent } from "react";
import { Layer, Rect } from "react-konva";
import composeRefs from "@seznam/compose-react-refs";

import { useHover, useSelect, useTransformare, useDrag } from "../../../hooks";
import { ShapeObject, STROKE_WIDTH } from "../..";

export type RoundedRectangleProps = ShapeObject & {
  name: "RoundedRectangle";
};

export const RoundedRectangle: VoidFunctionComponent<RoundedRectangleProps> = (
  props
) => {
  const {
    id,
    x = 0,
    y = 0,
    scaleX = 1,
    scaleY = 1,
    rotation = 0,
    fillColor = "white",
    strokeColor = "black",
  } = props;

  const { ref: hoverRef } = useHover();
  const { onSelect } = useSelect(id);
  const { onDragEnd } = useDrag(props);
  const { ref: shapeRef, Transformer, onTransformEnd } = useTransformare(props);

  return (
    <Layer>
      <Rect
        id={id}
        // @ts-ignore
        ref={composeRefs(hoverRef, shapeRef)}
        x={x}
        y={y}
        width={100}
        height={50}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        cornerRadius={8}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={STROKE_WIDTH}
        draggable={true}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
      />
      <Transformer />
    </Layer>
  );
};

export default RoundedRectangle;