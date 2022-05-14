import { VoidFunctionComponent } from "react";
import { FlowchartShapeName } from "../shared/components/shapes/flowchart";
import { useAppDispatch } from "../shared/hooks";
import { actions } from "../shared/store";
import { BasicShapeProps } from "../shared/components/shapes/basic";

type MenuProps = {};

const basicShapes: {
  name: string;
  type: string;
  displayName?: string;
  image: string;
}[] = [
  {
    name: "Rectangle",
    type: "shape",
    displayName: "Rectangle",
    image: "Rectangle.png",
  },
  {
    name: "Circle",
    type: "shccircleircleape",
    displayName: "Circle",
    image: "Circle.png",
  },
  {
    name: "Line",
    type: "line",
    displayName: "Line",
    image: "Line.png",
  },
];

const flowchatItems: {
  name: FlowchartShapeName;
  displayName?: string;
  image: string;
}[] = [
  {
    name: "flowchart__card",
    displayName: "Card",
    image: "card.svg",
  },
  {
    name: "flowchart__collate",
    displayName: "Collate",
    image: "collate.svg",
  },
  {
    name: "flowchart__data",
    displayName: "Data",
    image: "data.svg",
  },
  {
    name: "flowchart__database",
    displayName: "Database",
    image: "database.svg",
  },
  {
    name: "flowchart__decision",
    displayName: "Decision",
    image: "decision.svg",
  },
  {
    name: "flowchart__delay",
    displayName: "Delay",
    image: "delay.svg",
  },
  {
    name: "flowchart__direct-data",
    displayName: "Direct Data",
    image: "direct_data.svg",
  },
  {
    name: "flowchart__display",
    displayName: "Display",
    image: "display.svg",
  },
  {
    name: "flowchart__document",
    displayName: "Document",
    image: "document.svg",
  },
  {
    name: "flowchart__extract-or-measurement",
    displayName: "Extract or Measurement",
    image: "extract_or_measurement.svg",
  },
  {
    name: "flowchart__internal-storage",
    displayName: "Internal Storage",
    image: "internal_storage.svg",
  },
  {
    name: "flowchart__manual-input",
    displayName: "Manual Input",
    image: "manual_input.svg",
  },
  {
    name: "flowchart__manual-operation",
    displayName: "Manual Operation",
    image: "manual_operation.svg",
  },
  {
    name: "flowchart__merge-or-storage",
    displayName: "Merge or Storage",
    image: "merge_or_storage.svg",
  },
  {
    name: "flowchart__or",
    displayName: "Or",
    image: "or.svg",
  },
  {
    name: "flowchart__predefined-prosess",
    displayName: "Predefined Prosess",
    image: "predefined_prosess.svg",
  },
  {
    name: "flowchart__preparation",
    displayName: "Preparation",
    image: "preparation.svg",
  },
  {
    name: "flowchart__process",
    displayName: "Process",
    image: "process.svg",
  },
  {
    name: "flowchart__sequential-data",
    displayName: "Sequential Data",
    image: "sequential_data.svg",
  },
  {
    name: "flowchart__sort",
    displayName: "Sort",
    image: "sort.svg",
  },
  {
    name: "flowchart__start",
    displayName: "Start",
    image: "start.svg",
  },
  {
    name: "flowchart__stored-data",
    displayName: "Stored Data",
    image: "stored_data.svg",
  },
  {
    name: "flowchart__summing-junction",
    displayName: "Summing Junction",
    image: "summing_junction.svg",
  },
  {
    name: "flowchart__tape",
    displayName: "Tape",
    image: "tape.svg",
  },
];

export const Menu: VoidFunctionComponent<MenuProps> = (props) => {
  const dispatch = useAppDispatch();

  const onClickMenu = (name: FlowchartShapeName) => {
    dispatch(actions.add({ name, type: "shape" }));
  };

  return (
    <div className="flex flex-col gap-2 basis-36 shrink-0">
      <div className="p-2">Basic</div>
      <div className="flex flex-wrap gap-2 p-2">
        {basicShapes.map((shape) => (
          <button
            key={shape.name}
            className="w-8 h-6 flex justify-center items-center"
            title={shape.displayName}
            // @ts-ignore
            onClick={() => onClickMenu(shape.name)}
          >
            <img
              src={`images/${shape.image}`}
              className="object-contain w-8 h-6"
            />
          </button>
        ))}
      </div>
      <div className="p-2">Flowchart</div>
      <div className="flex flex-wrap gap-2 p-2">
        {flowchatItems.map((item) => (
          <button
            key={item.name}
            className="w-8 h-6 flex justify-center items-center"
            title={item.displayName}
            onClick={() => onClickMenu(item.name)}
          >
            <img
              src={`images/flowchart/${item.image}`}
              className="object-contain w-8 h-6"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
