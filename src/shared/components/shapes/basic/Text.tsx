import { VoidFunctionComponent } from "react";
import { Text as KonvaText } from "react-konva";
import composeRefs from "@seznam/compose-react-refs";

import { useHover, useSelect, useTransformare, useDrag } from "../../../hooks";
import { TextObject } from "../..";

export type TextProps = TextObject & {
  name: "Text";
};

const Text: VoidFunctionComponent<TextProps> = (props) => {
  const {
    id,
    x = 0,
    y = 0,
    scaleX = 1,
    scaleY = 1,
    rotation = 0,
    fillColor = "black",
    text = "",
  } = props;

  const { ref: hoverRef } = useHover();
  const { onSelect } = useSelect(id);
  const { onDragEnd } = useDrag(props);
  const { ref: shapeRef, Transformer, onTransformEnd } = useTransformare(props);

  return (
    <>
      <KonvaText
        // @ts-ignore
        ref={composeRefs(shapeRef, hoverRef)}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        text={text}
        fill={fillColor}
        draggable={true}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
      />
      <Transformer enabledAnchors={["middle-left", "middle-right"]} />
    </>
  );
};

export default Text;
