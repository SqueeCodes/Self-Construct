import { fabric } from "fabric";
import { useCallback, useState, useMemo } from "react";
import { useAutoResize } from "./use-auto-resize";
import {
  BuildEditorProps,
  Editor,
  CIRCLE_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_WIDTH,
  EditorHookProps,
  STROKE_DASH_ARRAY
} from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { isTextType } from "../utils";


const buildEditor = ({
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  selectedObjects,
  strokeDashArray,
  setStrokeDashArray,
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    // @ts-ignore
    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        // text types dont have strokes
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }
        object.set({ stroke: value });
      });

      canvas.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });
      canvas.renderAll();
    },

    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
      canvas.renderAll();
    },

    changeFillColor: (value: string) => {
      setFillColor(value), console.log("color changed");
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });
      canvas.renderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);

    },

    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
        rx: 50,
        ry: 50,
      });

      addToCanvas(object);
    },

    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.width;
      const WIDTH = TRIANGLE_OPTIONS.height;

      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );
      addToCanvas(object);
    },

    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );
      addToCanvas(object);
    },
    canvas,

    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fillColor;
      }
      const value = selectedObject.get("fill") || fillColor;
      // Currenty, gradients & patterns are not supported. only strings.
      return value as string;
    },

    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeColor;
      }
      const value = selectedObject.get("stroke") || strokeColor;
      return value;
    },

    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeWidth;
      }
      const value = selectedObject.get("strokeWidth") || strokeWidth;
      return value;
    },

    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeDashArray;
      }
      const value = selectedObject.get("strokeDashArray") || strokeDashArray;
      return value;
    },
    selectedObjects,
  };
};


export const useEditor = ({
  clearSelectionCallback
}: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);


  useAutoResize({
    canvas,
    container,
  });


  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeDashArray,
        setStrokeDashArray,
        setFillColor,
        setStrokeWidth,
        setStrokeColor,
        selectedObjects,
      });
    }

    return undefined;
  }, [canvas,
    fillColor,
    strokeWidth,
    strokeColor,
    selectedObjects,
    strokeDashArray,   //<- very import to always add after adding to your buildEditor
  ]);

  const init = useCallback(({
    initialCanvas,
    initialContainer,
  }: {
    initialCanvas: fabric.Canvas;
    initialContainer: HTMLDivElement,
  }) => {
    fabric.Object.prototype.set({
      cornerColor: "#FFF",
      cornerStyle: "circle",
      borderColor: "#3B82F6",
      borderScaleFactor: 1.5,
      transparentCorners: false,
      borderOpacityWhenMoving: 1,
      cornerStrokeColor: "#3B82F6",
    });

    const initalWorkspace = new fabric.Rect({
      width: 900,
      height: 1200,
      name: "clip",
      fill: "white",
      selectable: false,
      hasControls: false,
      shadow: new fabric.Shadow({
        color: "rgba(0,0,0,0.8)",
        blur: 5,
      }),
    });
    initialCanvas.setWidth(
      initialContainer.offsetWidth
    );
    initialCanvas.setHeight(
      initialContainer.offsetHeight
    );

    initialCanvas.add(initalWorkspace);
    initialCanvas.centerObject(initalWorkspace);
    initialCanvas.clipPath = initalWorkspace;

    setCanvas(initialCanvas);
    setContainer(initialContainer);
  }, []);

  return { init, editor }
};