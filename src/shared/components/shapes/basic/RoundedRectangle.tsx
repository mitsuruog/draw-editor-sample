import { VoidFunctionComponent } from "react";
import { Rect } from "react-konva";
import composeRefs from "@seznam/compose-react-refs";

import { useHover, useSelect, useShape } from "../../../hooks";
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
  const { shapeRef, Transformer, onTransformEnd, onDragEnd } = useShape(props);

  return (
    <>
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
        strokeScaleEnabled={false}
        draggable={true}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
      />
      <Transformer />
    </>
  );
};

export default RoundedRectangle;
