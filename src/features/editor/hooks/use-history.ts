import { fabric } from "fabric";
import { useCallback, useRef, useState } from "react";

import { JSON_KEYS } from "../types";

interface UseHistoryProps {
  canvas: fabric.Canvas | null;
}

export const useHistory = ({ canvas }: UseHistoryProps) => {
  const [historyIndex, setHistoryIndex] = useState(0);
  const canvasHistory = useRef<string[]>([]);
  const skipSave = useRef(false);

  const canUndo = useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);

  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;
  }, [historyIndex]);

  const save = useCallback(() => {
    if (!canvas) return;
    const currentState = canvas.toJSON(JSON_KEYS);
    const json = JSON.stringify(currentState);

    if (!skipSave.current) {
      canvasHistory.current.push(json);
      setHistoryIndex(canvasHistory.current.length - 1);
    }

    //TODO: Save callback
  }, 
  [
    canvas,
  ]);
  return { save };
};
