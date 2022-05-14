import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from ".";
import { actions } from "../store";

export const useHover = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const dispatch = useAppDispatch();
  const { hovering } = useAppSelector((state) => state.ui);

  const [isHovering, setHovering] = useState(false);

  const onHover = () => {
    setHovering(true);
    if (!hovering) {
      dispatch(actions.hover());
    }
  };

  const onUnhover = () => {
    setHovering(false);
    dispatch(actions.unhover());
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", onHover);
      node.addEventListener("mouseleave", onUnhover);

      // cleanup
      return () => {
        node.removeEventListener("mouseover", onHover);
        node.removeEventListener("mouseleave", onUnhover);
      };
    }
  }, [ref.current]);

  return { ref, isHovering };
};
