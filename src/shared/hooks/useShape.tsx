import { useEffect, useMemo, useRef, VoidFunctionComponent } from "react";
import Konva from "konva";
import { Transformer as KonvaTransformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { DrawObject } from "../components";
import { useAppDispatch, useAppSelector } from ".";
import { actions } from "../store";

export const useShape = (object: DrawObject) => {
  const { id } = object;

  const shapeRef = useRef<Konva.Node>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const dispatch = useAppDispatch();
  const { selectedShapeId } = useAppSelector((state) => state.shape);

  useEffect(() => {
    if (transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [shapeRef.current, transformerRef.current]);

  const Transformer = useMemo(() => {
    const TransformerComponent: VoidFunctionComponent<
      Konva.TransformerConfig
    > = (props) => {
      return id === selectedShapeId ? (
        <KonvaTransformer
          ref={transformerRef}
          {...props}
          rotationSnaps={[0, 90, 180, 270]}
          ignoreStroke={true}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 30 || newBox.height < 30) {
              return oldBox;
            }
            return newBox;
          }}
        />
      ) : null;
    };
    return TransformerComponent;
  }, [transformerRef, id, selectedShapeId]);

  const onTransformEnd = (e: KonvaEventObject<Event>) => {
    const node = shapeRef.current;
    if (node) {
      dispatch(
        actions.change({
          ...object,
          x: node.x(),
          y: node.y(),
          scaleX: node.scaleX(),
          scaleY: node.scaleY(),
          rotation: node.rotation(),
        })
      );
    }
  };

  const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const node = e.target;
    dispatch(
      actions.change({
        ...object,
        x: node.x(),
        y: node.y(),
      })
    );
  };

  return { shapeRef, Transformer, onTransformEnd, onDragEnd };
};
