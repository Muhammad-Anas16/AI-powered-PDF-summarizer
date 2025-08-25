import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      // Get token from cookies
      const cookieStore = cookies();
      const token = cookieStore.get("token")?.value;

      if (!token) {
        throw new UploadThingError("Unauthorized: No token provided");
      }

      // Decode token (no secret needed if it's not signed locally)
      let decoded: any;
      try {
        decoded = jwt.decode(token);
      } catch (err) {
        throw new UploadThingError("Unauthorized: Invalid token");
      }

      if (!decoded || !decoded.id) {
        throw new UploadThingError("Unauthorized: Invalid payload");
      }

      return { userId: decoded.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completed for user id", metadata.userId);
      console.log("File URL", file.url);
      return { userId: metadata.userId, file };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;