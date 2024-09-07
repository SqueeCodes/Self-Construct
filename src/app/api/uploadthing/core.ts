import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// import { auth } from "@/auth";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); //Fake auth function
 
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
 
      if (!user) throw new UploadThingError("Unauthorized");
 
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
