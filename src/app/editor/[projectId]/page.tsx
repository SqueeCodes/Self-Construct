"use client";

import { Loader2, Loader, TriangleAlert } from "lucide-react";

import { Editor } from "../../../features/editor/components/editor";

import { useGetProject } from "../../../features/projects/api/use-get-project";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

interface EditorProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const EditorProjectIdPage = ({ 
  params,
 }: EditorProjectIdPageProps) => {
  const {
    data,
    isLoading,
    isError 
      } = useGetProject(params.projectId);

  if (isLoading || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-3 items-center justify-center">
        <TriangleAlert className="size-6 animate-bounce text-muted-foreground text-red-400" />
        <p className="text-muted-foreground text-sm animate-pulse">
          Failed to fetch project
        </p>
        <div className="mt-11">
          <Button
            asChild
            variant="secondary"
            className="hover:bg-slate-200 hover:shadow-lg transition"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <Editor initialData={data} />;
};

export default EditorProjectIdPage;
