import { fabric } from "fabric";
import { useEffect } from "react";

interface useCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  save,
  canvas,
  clearSelectionCallback,
  setSelectedObjects
}: useCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", () => save());
      canvas.on("object:removed", () => save());
      canvas.on("object:modified", () => save());
      canvas.on("selection:created", (e) => {
        console.log("selection:created");
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        console.log("selection:updated");
        setSelectedObjects(e.selected || [])
      });
      canvas.on("selection:cleared", () => {
        console.log("selection:cleared");
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:added");
        canvas.off("selection:removed");
        canvas.off("selection:modified");
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [
    save,
    canvas,
    clearSelectionCallback,
    setSelectedObjects // <- not needed

  ]);
};