import { VoidFunctionComponent, useEffect } from "react";
import { ReactReduxContext, Provider } from "react-redux";
import { Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { Shapes } from "../shared/components";
import { useAppSelector, useAppDispatch, useKeyPress } from "../shared/hooks";
import { actions } from "../shared/store";
import { FlowchartShape } from "../shared/components/shapes/flowchart";
import { Menu } from ".";

type MainProps = {};

export const Main: VoidFunctionComponent<MainProps> = (props) => {
  const dispatch = useAppDispatch();
  const { hovering } = useAppSelector((state) => state.ui);
  const { shapes, selectedShapeId } = useAppSelector((state) => state.shape);

  const { keyPressed } = useKeyPress("Backspace");

  const onClickStage = (e: KonvaEventObject<MouseEvent>) => {
    const clickedOnStage = e.target === e.target.getStage();
    if (clickedOnStage) {
      dispatch(actions.unselect());
    }
  };

  const onContextMenu = (e: KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault();
    const clickedOnStage = e.target === e.target.getStage();
    if (clickedOnStage) {
      return;
    }
    console.log("context menu");
  };

  useEffect(() => {
    if (selectedShapeId && keyPressed) {
      dispatch(actions.delete({ id: selectedShapeId }));
    }
  }, [keyPressed, selectedShapeId, dispatch]);

  return (
    <div className="flex flex-grow bg-slate-100">
      <Menu />
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            width={1280}
            height={900}
            onClick={onClickStage}
            onContextMenu={onContextMenu}
            style={{ cursor: hovering ? "move" : "" }}
            className="bg-white"
          >
            <Provider store={store}>
              {shapes.map(({ id, name, ...shapeProps }) => {
                // @ts-ignore TODO
                const ShapeName = Shapes[name] as string;
                if (name.startsWith("flowchart")) {
                  return (
                    <FlowchartShape
                      key={id}
                      id={id}
                      // @ts-ignore
                      name={name}
                      {...shapeProps}
                    />
                  );
                } else {
                  return (
                    <ShapeName key={id} {...{ id, name, ...shapeProps }} />
                  );
                }
              })}
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
};
