import { useEffect, useRef, VoidFunctionComponent } from "react";
import { Circle as KonovaCircle, Transformer } from "react-konva";
import Konva from "konva";
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

  const shapeRef = useRef(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const adjustedX = x ?? r;
  const adjustedY = y ?? r;
  const adjustedR = r - STROKE_WIDTH / 2;

  useEffect(() => {
    if (transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [transformerRef.current, shapeRef.current]);

  return (
    <>
      <KonovaCircle
        ref={shapeRef}
        x={adjustedX}
        y={adjustedY}
        radius={adjustedR}
        fill="white"
        stroke="black"
        strokeWidth={STROKE_WIDTH}
        draggable={true}
      />
      <Transformer ref={transformerRef} />
    </>
  );
};
