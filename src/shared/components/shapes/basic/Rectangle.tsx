import { VoidFunctionComponent } from "react";
import { Layer, Rect } from "react-konva";
import composeRefs from "@seznam/compose-react-refs";

import { useHover, useSelect, useShape } from "../../../hooks";
import { ShapeObject, STROKE_WIDTH } from "../..";

export type RectangleProps = ShapeObject & {
  name: "Rectangle";
};

export const Rectangle: VoidFunctionComponent<RectangleProps> = (props) => {
  const { id, x, y, rotation, scaleX, scaleY, fillColor, strokeColor } = props;

  const { ref: hoverRef } = useHover();
  const { onSelect } = useSelect(id);
  const { shapeRef, Transformer, onTransformEnd, onDragEnd } = useShape(props);

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
    </Layer>
  );
};

Rectangle.defaultProps = {
  x: 50,
  y: 50,
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  fillColor: "white",
  strokeColor: "black",
};

export default Rectangle;
