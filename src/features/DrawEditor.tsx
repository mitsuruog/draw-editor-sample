import { useCallback, VoidFunctionComponent, useReducer } from "react";
import { useDrop, XYCoord } from "react-dnd";
import { generate } from "shortid";

import { Circle, Rectangle } from "../shared/components";
import { DragItem } from "../shared/models";

type DrawEditorProps = {};

type ActionType =
  | {
      type: "move";
      payload: { id: string; x: number; y: number; kind: string };
    }
  | { type: "delete"; payload: { id: string } };

export const DrawEditor: VoidFunctionComponent<DrawEditorProps> = (props) => {
  const initalState: { shapes: DragItem[] } = { shapes: [] };
  const reducer = (state: typeof initalState, action: ActionType) => {
    switch (action.type) {
      case "move": {
        const { id, ...rest } = action.payload;
        const exist = state.shapes.find((item) => item.id === id);
        const shapes = exist
          ? [
              ...state.shapes.map((item) =>
                item.id === id ? { id, ...rest } : item
              ),
            ]
          : [...state.shapes, { id: generate(), ...rest }];
        return { shapes };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initalState);

  const [, drop] = useDrop<DragItem>(
    () => ({
      accept: "Shape",
      drop: (item, monitor) => {
        const coords = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const { id, kind, x = 0, y = 0 } = item;
        const { x: gapX, y: gapY } = coords;
        dispatch({
          type: "move",
          payload: {
            id,
            x: Math.round(x + gapX),
            y: Math.round(y + gapY),
            kind,
          },
        });
        return undefined;
      },
      // collect: (monitor) => ({
      //   isOver: Boolean(monitor.isOver),
      // }),
    }),
    [dispatch]
  );

  return (
    <div className="flex flex-grow bg-slate-100">
      <div className="flex flex-grow flex-col items-center gap-4 p-4">
        <Circle />
      </div>
      <div
        className="flex flex-grow bg-white"
        style={{ width: 900, height: 900 }}
        ref={drop}
      >
        {state.shapes.map((shape) => {
          const { id, x, y } = shape;
          return <Circle id={id} x={x} y={y} />;
        })}
      </div>
    </div>
  );
};
