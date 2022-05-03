import React, { useCallback, useEffect, useState } from "react";

function getMousePosition(element: SVGElement) {}

export function useDrag(ref: React.MutableRefObject<SVGElement | null>) {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null
  );

  const startDrag = (e: Event) => {
    const { target } = e as MouseEvent & { target: HTMLElement };
    const isDraggable = Boolean(target.dataset.draggable);

    if (isDraggable) {
      console.log("startDrag");
      setSelectedElement(target);
    }
  };

  const drag = (e: Event) => {
    if (selectedElement) {
      e.preventDefault();
      console.log("drag");
    }
  };

  const endDrag = (e: Event) => {
    console.log("endDrag");
    setSelectedElement(null);
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    console.log("addEventListener", ref.current);
    ref.current.addEventListener("mousedown", startDrag);
    ref.current.addEventListener("mousemove", drag);
    ref.current.addEventListener("mouseup", endDrag);
    ref.current.addEventListener("mouseleave", endDrag);

    return function cleanup() {
      console.log("cleanup");
      ref.current?.removeEventListener("mousedown", startDrag);
      ref.current?.removeEventListener("mousemove", drag);
      ref.current?.removeEventListener("mouseup", endDrag);
      ref.current?.removeEventListener("mouseleave", endDrag);
    };
  }, [ref]);

  return {
    isDragging: Boolean(selectedElement),
  };
}
