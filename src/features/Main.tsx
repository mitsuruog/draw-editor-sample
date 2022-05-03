import { VoidFunctionComponent } from "react";
import { Stage, Layer } from "react-konva";

import { Circle } from "../shared/components";
import { useAppSelector, useAppDispatch } from "../shared/hooks";
import { actions } from "../shared/store";

type MainProps = {};

export const Main: VoidFunctionComponent<MainProps> = (props) => {
  const dispatch = useAppDispatch();
  const { shapes, selectedShapeId } = useAppSelector((state) => state.shape);

  return (
    <div className="flex flex-grow bg-slate-100 p-4">
      {/* <Stage width={900} height={900} className="bg-white">
        <Layer>
          {shapes.map((shapeProps) => (
            <Circle key={shapeProps.id} {...shapeProps} />
          ))}
        </Layer>
      </Stage> */}
    </div>
  );
};
