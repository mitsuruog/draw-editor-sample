import { VoidFunctionComponent } from "react";
import { Arrow as KonvaArrow, Group } from "react-konva";
import composeRefs from "@seznam/compose-react-refs";

import { useHover, useSelect, useLine } from "../../../hooks";
import { LineObject, STROKE_WIDTH, DEFAULT_LINE_POINTS } from "../..";

export type ArrowProps = LineObject & {
  name: "Arrow";
};

export const Arrow: VoidFunctionComponent<ArrowProps> = (props) => {
  const {
    id,
    points = DEFAULT_LINE_POINTS,
    fillColor = "black",
    strokeColor = "black",
  } = props;

  const { ref: hoverRef } = useHover();
  const { onSelect } = useSelect(id);
  const { groupRef, lineRef, Transformer, onDragEnd } = useLine(props);

  return (
    <Group ref={groupRef} draggable={true} onDragEnd={onDragEnd}>
      <KonvaArrow
        // @ts-ignore
        ref={composeRefs(hoverRef, lineRef)}
        points={points}
        stroke={strokeColor}
        strokeWidth={STROKE_WIDTH}
        fill={fillColor}
        hitStrokeWidth={5}
        onClick={onSelect}
        onTap={onSelect}
      />
      <Transformer />
    </Group>
  );
};
