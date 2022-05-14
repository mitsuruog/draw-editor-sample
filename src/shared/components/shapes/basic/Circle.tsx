import { VoidFunctionComponent } from "react";
import { Circle as KonovaCircle, Layer } from "react-konva";
import composeRefs from "@seznam/compose-react-refs";

import {
  useAppDispatch,
  useHover,
  useSelect,
  useTransformare,
  useDrag,
} from "../../../hooks";
import { CircleObject, STROKE_WIDTH } from "../..";

export type CircleProps = CircleObject & {
  name: "Circle";
};

export const Circle: VoidFunctionComponent<CircleProps> = (props) => {
  const {
    id,
    x = 0,
    y = 0,
    radius = 25,
    scaleX = 1,
    scaleY = 1,
    fillColor = "white",
    strokeColor = "black",
  } = props;

  const { ref: hoverRef } = useHover();
  const { onSelect } = useSelect(id);
  const { onDragEnd } = useDrag(props);
  const { ref: shapeRef, Transformer, onTransformEnd } = useTransformare(props);

  return (
    <Layer>
      <KonovaCircle
        id={id}
        // @ts-ignore
        ref={composeRefs(shapeRef, hoverRef)}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        radius={radius}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={STROKE_WIDTH}
        draggable={true}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
      />
      <Transformer
        enabledAnchors={[
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
        ]}
      />
    </Layer>
  );
};
