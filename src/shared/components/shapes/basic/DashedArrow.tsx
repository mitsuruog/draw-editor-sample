import { VoidFunctionComponent } from "react";
import { Arrow as KonvaArrow, Layer, Group } from "react-konva";
import composeRefs from "@seznam/compose-react-refs";

import { useHover, useSelect, useLine } from "../../../hooks";
import { LineObject, STROKE_WIDTH, DEFAULT_LINE_POINTS } from "../..";

export type DashedArrowProps = LineObject & {
  name: "DashedArrow";
};

export const DashedArrow: VoidFunctionComponent<DashedArrowProps> = (props) => {
  const {
    id,
    points = DEFAULT_LINE_POINTS,
    fillColor = "black",
    strokeColor = "black",
  } = props;

  const { ref: hoverRef } = useHover();
  const { onSelect } = useSelect(id);
  const { layerRef, lineRef, Transformer, onDragEnd } = useLine(props);

  return (
    <Layer ref={layerRef}>
      <Group draggable={true} onDragEnd={onDragEnd}>
        <KonvaArrow
          // @ts-ignore
          ref={composeRefs(hoverRef, lineRef)}
          points={points}
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH}
          fill={fillColor}
          dash={[5, 5]}
          hitStrokeWidth={5}
          onClick={onSelect}
          onTap={onSelect}
        />
        <Transformer />
      </Group>
    </Layer>
  );
};
