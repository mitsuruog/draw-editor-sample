import { useEffect, useMemo, useRef, useState } from "react";
import Konva from "konva";
import { Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { useAppDispatch, useAppSelector } from ".";
import {
  ANCHOR_SIZE,
  ANCHOR_STROKE,
  DEFAULT_LINE_POINTS,
  LineObject,
} from "../components";
import { actions } from "../store";

export const useLine = (object: LineObject) => {
  const { id, points = DEFAULT_LINE_POINTS, fillColor = "black" } = object;

  const dispatch = useAppDispatch();

  const layerRef = useRef<Konva.Layer>(null);
  const lineRef = useRef<Konva.Line>(null);
  const anchorRef1 = useRef<Konva.Rect>(null);
  const anchorRef2 = useRef<Konva.Rect>(null);

  const { selectedShapeId } = useAppSelector((state) => state.shape);

  const [selected, setSelected] = useState(id === selectedShapeId);

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
      dispatch(
        actions.change({
          ...object,
          type: "line",
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

  const Transformer = useMemo(() => {
    const LineTransformerComponent = () => {
      return selected ? (
        <>
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
        </>
      ) : null;
    };
    return LineTransformerComponent;
  }, [selected, points]);

  useEffect(() => {
    setSelected(id === selectedShapeId);
  }, [id, selectedShapeId]);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.stroke(selected ? ANCHOR_STROKE : fillColor);
    }
  }, [lineRef.current, selected]);

  return { layerRef, lineRef, Transformer, onDragEnd };
};
