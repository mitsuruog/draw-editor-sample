import { VoidFunctionComponent } from "react";
import { Ellipse as KonovaEllipse } from "react-konva";
import composeRefs from "@seznam/compose-react-refs";

import { useHover, useSelect, useShape } from "../../../hooks";
import { ShapeObject, STROKE_WIDTH } from "../..";

export type EllipseProps = ShapeObject & {
  name: "Ellipse";
};

export const Ellipse: VoidFunctionComponent<EllipseProps> = (props) => {
  const {
    id,
    x = 0,
    y = 0,
    scaleX = 1,
    scaleY = 1,
    fillColor = "white",
    strokeColor = "black",
  } = props;

  const { ref: hoverRef } = useHover();
  const { onSelect } = useSelect(id);
  const { shapeRef, Transformer, onTransformEnd, onDragEnd } = useShape(props);

  return (
    <>
      <KonovaEllipse
        id={id}
        // @ts-ignore
        ref={composeRefs(shapeRef, hoverRef)}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        radiusX={50}
        radiusY={25}
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
