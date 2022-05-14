import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  VoidFunctionComponent,
} from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Transformer as KonvaTransformer } from "react-konva";

import { RootState, AppDispatch, actions } from "../store";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { DrawObject } from "../components";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useHover = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const dispatch = useAppDispatch();
  const { hovering } = useAppSelector((state) => state.ui);

  const [isHovering, setHovering] = useState(false);

  const onHover = () => {
    setHovering(true);
    if (!hovering) {
      dispatch(actions.hover());
    }
  };

  const onUnhover = () => {
    setHovering(false);
    dispatch(actions.unhover());
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", onHover);
      node.addEventListener("mouseleave", onUnhover);

      // cleanup
      return () => {
        node.removeEventListener("mouseover", onHover);
        node.removeEventListener("mouseleave", onUnhover);
      };
    }
  }, [ref.current]);

  return { ref, isHovering };
};

export const useSelect = (id: string) => {
  const dispatch = useAppDispatch();
  const { selectedShapeId } = useAppSelector((state) => state.shape);

  const onSelect = () => dispatch(actions.select({ id }));

  return { onSelect, selected: selectedShapeId === id };
};

export const useTransformare = (object: DrawObject) => {
  const { id } = object;
  const ref = useRef<Konva.Node>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const dispatch = useAppDispatch();
  const { selectedShapeId } = useAppSelector((state) => state.shape);

  useEffect(() => {
    if (transformerRef.current && ref.current) {
      transformerRef.current.nodes([ref.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [ref.current, transformerRef.current]);

  const Transformer = useMemo(() => {
    const TransformerComponent: VoidFunctionComponent<
      Konva.TransformerConfig
    > = (props) => {
      return id === selectedShapeId ? (
        <KonvaTransformer
          ref={transformerRef}
          {...props}
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
    const node = ref.current;
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

  return { ref, Transformer, onTransformEnd };
};

export const useDrag = (object: DrawObject) => {
  const dispatch = useAppDispatch();
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

  return { onDragEnd };
};

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPress] = useState(false);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === targetKey) {
      setKeyPress(true);
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === targetKey) {
      setKeyPress(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // cleanup
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return { keyPressed };
};

export * from "./useLine";
