import React, { VoidFunctionComponent } from "react";
import { generate } from "shortid";
import { useDrag } from "react-dnd";

import { STROKE_WIDTH } from "../ShapeBase";
import { DragItem } from "../../../models";

type CircleProps = {
  id?: string;
  x?: number;
  y?: number;
  r?: number;
};

export const Circle: VoidFunctionComponent<CircleProps> = (props) => {
  const { id = generate(), x, y, r = 25 } = props;
  const adjustedR = r - STROKE_WIDTH / 2;

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    unknown,
    { isDragging: boolean }
  >({
    type: "Shape",
    item: { id, kind: "Circle", x, y },
    collect: (moniter) => ({ isDragging: !!moniter.isDragging }),
  });

  return (
    <div ref={drag} style={{ position: "absolute", top: y, left: x }}>
      <svg width={r * 2} height={r * 2}>
        <circle
          cy={r}
          cx={r}
          r={adjustedR}
          fill="white"
          stroke="black"
          strokeWidth={STROKE_WIDTH}
          data-draggable={true}
        />
      </svg>
    </div>
  );
};
