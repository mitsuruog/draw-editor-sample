import { VoidFunctionComponent } from "react";
import { Group, Layer, Path } from "react-konva";
import { generate } from "shortid";
import composeRefs from "@seznam/compose-react-refs";

import { ShapeObject, STROKE_WIDTH } from "..";
import { useSelect, useHover, useShape } from "../../../hooks";

export type FlowchartShapeName =
  | "flowchart__card"
  | "flowchart__collate"
  | "flowchart__data"
  | "flowchart__database"
  | "flowchart__decision"
  | "flowchart__delay"
  | "flowchart__direct-data"
  | "flowchart__display"
  | "flowchart__document"
  | "flowchart__extract-or-measurement"
  | "flowchart__internal-storage"
  | "flowchart__manual-input"
  | "flowchart__manual-operation"
  | "flowchart__merge-or-storage"
  | "flowchart__or"
  | "flowchart__predefined-prosess"
  | "flowchart__preparation"
  | "flowchart__process"
  | "flowchart__sequential-data"
  | "flowchart__sort"
  | "flowchart__start"
  | "flowchart__stored-data"
  | "flowchart__summing-junction"
  | "flowchart__tape";

export type FlowchartShapeProps = ShapeObject & { name: FlowchartShapeName };

type FlowchartShapeMeta = {
  name: FlowchartShapeName;
  width: number;
  height: number;
  paths: string[];
};

const FlowchartShapes: FlowchartShapeMeta[] = [
  {
    name: "flowchart__card",
    width: 124,
    height: 75,
    paths: [
      "M1.32605 7.86142L13.219 0.642883H122.853V74.0143H1.32605V7.86142Z",
    ],
  },
  {
    name: "flowchart__collate",
    width: 76,
    height: 79,
    paths: [
      "M38.8696 38.5592L2.9026 0.642853H74.8365L38.8696 38.5592Z",
      "M1.73914 78.4286H76L38.8696 39.2857L1.73914 78.4286Z",
    ],
  },
  {
    name: "flowchart__data",
    width: 137,
    height: 79,
    paths: ["M1.4842 77.9286L28.1677 0.642857H135.607L108.925 77.9286H1.4842Z"],
  },
  {
    name: "flowchart__database",
    width: 151,
    height: 128,
    paths: [
      "M1.08698 22.1117C30.7913 6.38525 45.6435 1.14285 75.3478 1.14285C105.052 1.14285 119.904 6.38525 149.609 22.1117V105.987C119.904 121.714 105.052 126.956 75.3478 126.956C45.6435 126.956 30.7913 121.714 1.08698 105.987V22.1117Z",
      "M1.08698 22.1117C30.7913 37.8385 45.6435 43.0805 75.3478 43.0805C105.052 43.0805 119.904 37.8385 149.609 22.1117",
    ],
  },
  {
    name: "flowchart__decision",
    width: 92,
    height: 94,
    paths: [
      "M1.13431 46.9105L46.1943 0.857794L91.2544 46.9105L46.1943 92.9633L1.13431 46.9105Z",
    ],
  },
  {
    name: "flowchart__delay",
    width: 150,
    height: 79,
    paths: [
      "M1.28261 1.21429H99.7983C126.977 1.21429 148.804 18.6178 148.804 39.8571C148.804 61.0965 126.977 78.5 99.7983 78.5H1.28261V1.21429Z",
    ],
  },
  {
    name: "flowchart__direct-data",
    width: 151,
    height: 86,
    paths: [
      "M22.3728 0.565247H128.584C144.516 17.3913 149.826 25.8044 149.826 42.6305C149.826 59.4566 144.516 67.8696 128.584 84.6957H22.3728C6.44082 67.8696 1.13043 59.4566 1.13043 42.6305C1.13043 25.8044 6.44082 17.3913 22.3728 0.565247Z",
      "M128.584 0.565247C112.652 17.3913 107.342 25.8044 107.342 42.6305C107.342 59.4566 112.652 67.8696 128.584 84.6957",
    ],
  },
  {
    name: "flowchart__display",
    width: 149,
    height: 79,
    paths: [
      "M0.786131 39.2857L21.7314 0.642857H127.318C135.191 8.39852 140.405 14.1913 143.662 19.9601C146.926 25.7414 148.239 31.524 148.239 39.2857C148.239 47.0474 146.926 52.83 143.662 58.6113C140.405 64.3801 135.191 70.1729 127.318 77.9286H21.7314L0.786131 39.2857Z",
    ],
  },
  {
    name: "flowchart__document",
    width: 112,
    height: 86,
    paths: [
      "M0.434784 0.714279H111.826V76.2025C89.5478 63.6212 78.4087 63.6212 56.1304 76.2025C33.8522 88.7837 22.713 88.7837 0.434784 76.2025V0.714279Z",
    ],
  },
  {
    name: "flowchart__extract-or-measurement",
    width: 154,
    height: 128,
    paths: ["M1.78261 126.956H152.161L76.9717 1.14288L1.78261 126.956Z"],
  },
  {
    name: "flowchart__internal-storage",
    width: 159,
    height: 80,
    paths: [
      "M157.826 0.565247H1.30432V78.8261H157.826V0.565247Z",
      "M16.9565 0.565247V78.8261",
      "M1.30432 8.39127H157.826",
    ],
  },
  {
    name: "flowchart__manual-input",
    width: 149,
    height: 105,
    paths: ["M0.630432 104.487V42.4589L148.152 0.803585V104.487H0.630432Z"],
  },
  {
    name: "flowchart__manual-operation",
    width: 119,
    height: 79,
    paths: [
      "M24.8068 78.4131L1.62856 1.15218H117.676L94.4976 78.4131H24.8068Z",
    ],
  },
  {
    name: "flowchart__merge-or-storage",
    width: 160,
    height: 128,
    paths: ["M1.26087 1.14288H159.065L80.163 126.956L1.26087 1.14288Z"],
  },
  {
    name: "flowchart__or",
    width: 80,
    height: 78,
    paths: [
      "M40.3347 77.0428C61.8666 77.0428 79.3217 59.9561 79.3217 38.8786C79.3217 17.801 61.8666 0.714294 40.3347 0.714294C18.8029 0.714294 1.34784 17.801 1.34784 38.8786C1.34784 59.9561 18.8029 77.0428 40.3347 77.0428Z",
      "M40.3348 0.714294V77.0428",
      "M1.34784 38.8785H79.3217",
    ],
  },
  {
    name: "flowchart__predefined-prosess",
    width: 150,
    height: 81,
    paths: [
      "M149.304 1.28571H0.782608V79.5714H149.304V1.28571Z",
      "M15.6348 1.28571V79.5714",
      "M134.452 1.28571V79.5714",
    ],
  },
  {
    name: "flowchart__preparation",
    width: 149,
    height: 79,
    paths: [
      "M1.047 39.8571L21.9923 1.21428H127.486L148.431 39.8571L127.486 78.5H21.9923L1.047 39.8571Z",
    ],
  },
  {
    name: "flowchart__process",
    width: 112,
    height: 79,
    paths: ["M0.760872 0.642857H111.152V77.9286H0.760872V0.642857Z"],
  },
  {
    name: "flowchart__sequential-data",
    width: 102,
    height: 91,
    paths: [
      "M100.535 45.1963C100.535 69.4326 78.3742 89.1786 50.9087 89.1786C23.4432 89.1786 1.28261 69.4326 1.28261 45.1963C1.28261 20.96 23.4432 1.21393 50.9087 1.21393C78.3742 1.21393 100.535 20.96 100.535 45.1963Z",
      "M50.9087 89.6782H101.035",
    ],
  },
  {
    name: "flowchart__sort",
    width: 78,
    height: 84,
    paths: [
      "M39.1588 0.799988L77.2174 41.9L39.1588 83L1.10016 41.9L39.1588 0.799988Z",
      "M1.10016 41.9H77.2174",
    ],
  },
  {
    name: "flowchart__start",
    width: 76,
    height: 79,
    paths: [
      "M74.587 39.2857C74.587 60.6528 58.1624 77.9286 37.9565 77.9286C17.7506 77.9286 1.32605 60.6528 1.32605 39.2857C1.32605 17.9187 17.7506 0.642857 37.9565 0.642857C58.1624 0.642857 74.587 17.9187 74.587 39.2857Z",
    ],
  },
  {
    name: "flowchart__stored-data",
    width: 160,
    height: 80,
    paths: [
      "M27.2175 0.652176H157.652C138.087 16.3044 131.565 24.1304 131.565 39.7826C131.565 55.4348 138.087 63.2609 157.652 78.9131H27.2175C7.6523 63.2609 1.13043 55.4348 1.13043 39.7826C1.13043 24.1304 7.6523 16.3044 27.2175 0.652176Z",
    ],
  },
  {
    name: "flowchart__summing-junction",
    width: 75,
    height: 80,
    paths: [
      "M37.8696 79C58.3761 79 75 61.4751 75 39.8571C75 18.2391 58.3761 0.714294 37.8696 0.714294C17.363 0.714294 0.739136 18.2391 0.739136 39.8571C0.739136 61.4751 17.363 79 37.8696 79Z",
      "M11.6146 12.1792L64.1245 67.535",
      "M11.6146 67.535L64.1245 12.1792",
    ],
  },
  {
    name: "flowchart__tape",
    width: 127,
    height: 119,
    paths: [
      "M126.222 12.1483V105.33C113.954 97.7694 104.579 93.9355 95.1609 93.9355C85.5479 93.9355 75.9801 97.9295 63.3357 105.804L63.5836 106.202L63.3357 105.804C50.7313 113.655 41.3626 117.524 32.0392 117.524C22.7739 117.524 13.4639 113.703 0.978271 105.95V12.7686C13.2458 20.3313 22.6208 24.1662 32.0392 24.1662C41.6522 24.1662 51.22 20.1711 63.8644 12.2949C76.4687 4.44353 85.8374 0.574768 95.1609 0.574768C104.426 0.574768 113.736 4.39539 126.222 12.1483Z",
    ],
  },
];

export const FlowchartShape: VoidFunctionComponent<FlowchartShapeProps> = (
  props
) => {
  const {
    id,
    name,
    x = 0,
    y = 0,
    scaleX = 1,
    scaleY = 1,
    rotation = 0,
    fillColor = "white",
    strokeColor = "black",
  } = props;

  const { ref: hoverRef } = useHover();
  const { onSelect } = useSelect(id);
  const { shapeRef, Transformer, onTransformEnd, onDragEnd } = useShape(props);

  const shape = FlowchartShapes.find((item) => item.name === name);

  return (
    <Layer>
      <Group
        id={id}
        //@ts-ignore
        ref={composeRefs(hoverRef, shapeRef)}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        draggable={true}
        onClick={onSelect}
        onTransformEnd={onTransformEnd}
        onDragEnd={onDragEnd}
      >
        {shape?.paths.map((path) => (
          <Path
            key={generate()}
            data={path}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={STROKE_WIDTH}
            strokeScaleEnabled={false}
          />
        ))}
      </Group>
      <Transformer />
    </Layer>
  );
};
