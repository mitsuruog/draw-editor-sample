import React, { useRef, VoidFunctionComponent } from "react";

import { STROKE_WIDTH } from "../ShapeBase";

type RectangleProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export const Rectangle: VoidFunctionComponent<RectangleProps> = (props) => {
  const { x = 0, y = 0, width = 100, height = 50 } = props;
  const adjustedWidth = width - STROKE_WIDTH * 2;
  const adjustedHeight = height - STROKE_WIDTH * 2;

  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: "Shape",
  //   collect: (monitor) => ({ isDragging: Boolean(monitor.isDragging()) }),
  // }));

  // const { isDragging } = DnDService.useDrag(targetRef);

  return (
    <rect
      x={x + STROKE_WIDTH}
      y={y + STROKE_WIDTH}
      width={adjustedWidth}
      height={adjustedHeight}
      fill="transparent"
      stroke="#0f172a"
      strokeWidth={2}
      data-draggable={true}
      // style={{
      //   opacity: isDragging ? 0.5 : 1,
      //   cursor: isDragging ? "move" : "pointer",
      // }}
    />
  );
};
