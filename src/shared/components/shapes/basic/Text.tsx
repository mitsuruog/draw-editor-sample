import {
  VoidFunctionComponent,
  useState,
  useEffect,
  CSSProperties,
  useLayoutEffect,
  useRef,
} from "react";
import Konva from "konva";
import { Text as KonvaText, Group } from "react-konva";
import { Html } from "react-konva-utils";
import composeRefs from "@seznam/compose-react-refs";

import { useHover, useSelect, useShape, useAppDispatch } from "../../../hooks";
import { TextObject } from "../..";
import { actions } from "../../../store";

export type TextProps = TextObject & {
  name: "Text";
};

export const Text: VoidFunctionComponent<TextProps> = (props) => {
  const {
    id,
    x = 0,
    y = 0,
    scaleX = 1,
    scaleY = 1,
    rotation = 0,
    fillColor = "black",
    text: initalText = "text",
  } = props;

  const [text, setText] = useState(initalText);
  const [editorEnabled, setEditorEnabled] = useState(false);
  const [editorStyle, setEditorStyle] = useState<CSSProperties>();
  const groupRef = useRef<Konva.Group>(null);
  const textRef = useRef<Konva.Text>(null);
  const dispatch = useAppDispatch();

  const { ref: hoverRef } = useHover();
  const { onSelect } = useSelect(id);
  const { shapeRef, Transformer, onTransformEnd, onDragEnd } = useShape(props);

  useEffect(() => {
    if (!editorEnabled && initalText !== text) {
      dispatch(actions.change({ ...props, text }));
    }
  }, [editorEnabled, text, initalText]);

  useLayoutEffect(() => {
    const groupNode = groupRef.current;
    const textNode = textRef.current;
    if (textNode && groupNode) {
      // apply many styles to match text on canvas as close as possible
      // remember that text rendering on canvas and on the textarea can be different
      // and sometimes it is hard to make it 100% the same. But we will try...
      const newStyle: React.CSSProperties = {};

      newStyle.position = "absolute";
      newStyle.top = groupNode.x();
      newStyle.left = groupNode.y();
      newStyle.width = textNode.width() - textNode.padding() * 2 + "px";
      newStyle.height = textNode.height() - textNode.padding() * 2 + 10 + "px";
      newStyle.fontSize = textNode.fontSize() + "px";
      newStyle.border = "none";
      newStyle.padding = "0px";
      newStyle.overflow = "hidden";
      newStyle.background = "none";
      newStyle.outline = "none";
      newStyle.resize = "none";
      newStyle.lineHeight = textNode.lineHeight() + 0.01;
      newStyle.fontFamily = '"' + textNode.fontFamily() + '"';
      newStyle.transformOrigin = "left top";
      // @ts-ignore
      newStyle.textAlign = textNode.align();
      newStyle.color = textNode.fill();
      newStyle.overflowWrap = "break-word";
      newStyle.whiteSpace = "normal";
      newStyle.userSelect = "text";
      newStyle.wordBreak = "normal";

      if (JSON.stringify(newStyle) !== JSON.stringify(editorStyle)) {
        setEditorStyle(newStyle);
      }
    }
  });

  return (
    <>
      <Group
        ref={groupRef}
        draggable={true}
        onDragEnd={onDragEnd}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
      >
        <KonvaText
          // @ts-ignore
          ref={composeRefs(shapeRef, hoverRef, textRef)}
          rotation={rotation}
          text={text}
          fill={fillColor}
          visible={!editorEnabled}
          onClick={onSelect}
          onTap={onSelect}
          onDblClick={() => setEditorEnabled(true)}
          onDblTap={() => setEditorEnabled(true)}
          onTransformEnd={onTransformEnd}
        />
      </Group>
      {editorEnabled && (
        <Group>
          <Html>
            <textarea
              value={text}
              style={editorStyle}
              onChange={(e) => setText(e.target.value)}
              onBlur={() => setEditorEnabled(false)}
            />
          </Html>
        </Group>
      )}
      <Transformer
        enabledAnchors={["middle-left", "middle-right"]}
        visible={!editorEnabled}
      />
    </>
  );
};
