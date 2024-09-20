import { Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Hint } from "./hint";
import { Editor } from "../types";

interface FooterProps {
  editor: Editor | undefined;
}

export const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className="h-[52px] border-t bg-white w-full flex items-center overflow-x-auto  z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse">
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.autoZoom()}
          variant="ghost"
          className="h-full"
        >
          <Minimize className="size-4" />
        </Button>
      </Hint>
      <Hint label="ZoomIn" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomIn()}
          variant="ghost"
          className="h-full"
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom out" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomOut()}
          variant="ghost"
          className="h-full"
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
};
