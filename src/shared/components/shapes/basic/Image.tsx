import { VoidFunctionComponent } from "react";
import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import composeRefs from "@seznam/compose-react-refs";

import { useHover, useSelect, useShape } from "../../../hooks";
import { ImageObject } from "../..";

export type ImageProps = ImageObject & {
  name: "Image";
};

export const Image: VoidFunctionComponent<ImageProps> = (props) => {
  const {
    id,
    x = 0,
    y = 0,
    scaleX = 1,
    scaleY = 1,
    rotation = 0,
    uri = "",
  } = props;

  const [image] = useImage(uri);

  const { ref: hoverRef } = useHover();
  const { onSelect } = useSelect(id);
  const { shapeRef, Transformer, onTransformEnd, onDragEnd } = useShape(props);

  return (
    <>
      <KonvaImage
        id={id}
        // @ts-ignore
        ref={composeRefs(hoverRef, shapeRef)}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        image={image}
        draggable={true}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
      />
      <Transformer
        enabledAnchors={[
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
        ]}
      />
    </>
  );
};
