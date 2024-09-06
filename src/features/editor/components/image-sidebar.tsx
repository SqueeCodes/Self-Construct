
import { AlertTriangle, Loader2, LoaderCircleIcon } from "lucide-react";
import { 
  ActiveTool, 
  Editor,
} from "../types"
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

import { useGetImages } from "../../images/api/use-get-images";

import { cn } from "../../../lib/utils";
import { ScrollArea } from "../../../components/ui/scroll-area";

interface ImageSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const ImageSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ImageSidebarProps) => {
  const { data, isLoading, isError } = useGetImages();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "images" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your canvas"
      />
      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="size-6 text-muted-foreground animate-spin"/>
        </div>
      )}
      {true && (
        <div className="flex items-center justify-center flex-1 flex-col">
          <AlertTriangle className="size-6 text-muted-foreground animate-bounce text-red-500"/>
          <p className="text-muted-foreground text-xs">
          Failed to fetch images
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="p-4 space-y-2 border-b">
          
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
