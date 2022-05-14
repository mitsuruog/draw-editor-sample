import { useRef, VoidFunctionComponent } from "react";
import { Line as KonvaLine, Layer, Rect, Group } from "react-konva";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import composeRefs from "@seznam/compose-react-refs";

import { useHover, useSelect, useAppDispatch } from "../../../hooks";
import { LineObject, STROKE_WIDTH } from "../..";
import { actions } from "../../../store";

const ANCHOR_SIZE = 10;
const ANCHOR_STROKE = "rgb(0, 161, 255)";

export type LineProps = LineObject & {
  name: "Line";
};

export const Line: VoidFunctionComponent<LineProps> = (props) => {
  const { id, points = [0, 0, 100, 100] } = props;

  const dispatch = useAppDispatch();

  const layerRef = useRef<Konva.Layer>(null);
  const lineRef = useRef<Konva.Line>(null);
  const anchorRef1 = useRef<Konva.Rect>(null);
  const anchorRef2 = useRef<Konva.Rect>(null);

  const { ref: hoverRef } = useHover();
  const { onSelect, selected } = useSelect(id);

  const updateLine = (e: KonvaEventObject<DragEvent>) => {
    if (
      anchorRef1.current &&
      anchorRef2.current &&
      lineRef.current &&
      layerRef.current
    ) {
      const newPoints = [
        anchorRef1.current.x() + ANCHOR_SIZE / 2,
        anchorRef1.current.y() + ANCHOR_SIZE / 2,
        anchorRef2.current.x() + ANCHOR_SIZE / 2,
        anchorRef2.current.y() + ANCHOR_SIZE / 2,
      ];
      lineRef.current.points(newPoints);
      layerRef.current.batchDraw();
    }
  };

  const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
    if (anchorRef1.current && anchorRef2.current) {
      const node = e.target;
      dispatch(
        actions.change({
          ...props,
          points: [
            anchorRef1.current.x() + ANCHOR_SIZE / 2,
            anchorRef1.current.y() + ANCHOR_SIZE / 2,
            anchorRef2.current.x() + ANCHOR_SIZE / 2,
            anchorRef2.current.y() + ANCHOR_SIZE / 2,
          ],
        })
      );
    }
  };

  return (
    <Layer ref={layerRef}>
      <Group draggable={true} onDragEnd={onDragEnd}>
        <KonvaLine
          // @ts-ignore
          ref={composeRefs(hoverRef, lineRef)}
          points={points}
          stroke={selected ? ANCHOR_STROKE : "black"}
          strokeWidth={STROKE_WIDTH}
          hitStrokeWidth={5}
          onClick={onSelect}
          onTap={onSelect}
        />
        {selected && (
          <>
            <Rect
              ref={anchorRef1}
              x={points[0] - ANCHOR_SIZE / 2}
              y={points[1] - ANCHOR_SIZE / 2}
              width={ANCHOR_SIZE}
              height={ANCHOR_SIZE}
              stroke={ANCHOR_STROKE}
              strokeWidth={1}
              fill="white"
              draggable={true}
              onDragMove={updateLine}
              onDragEnd={onDragEnd}
            />
            <Rect
              ref={anchorRef2}
              x={points[2] - ANCHOR_SIZE / 2}
              y={points[3] - ANCHOR_SIZE / 2}
              width={ANCHOR_SIZE}
              height={ANCHOR_SIZE}
              stroke={ANCHOR_STROKE}
              strokeWidth={1}
              fill="white"
              draggable={true}
              onDragMove={updateLine}
              onDragEnd={onDragEnd}
            />
          </>
        )}
      </Group>
    </Layer>
  );
};
