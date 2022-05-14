import { useEffect, useState } from "react";

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPress] = useState(false);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === targetKey) {
      setKeyPress(true);
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === targetKey) {
      setKeyPress(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // cleanup
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return { keyPressed };
};
