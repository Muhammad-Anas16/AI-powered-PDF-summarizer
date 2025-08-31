import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const f = createUploadthing();

<<<<<<< HEAD
interface DecodedToken {
  id: string;
  [key: string]: unknown;
}

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async () => {
      // Get token from cookies
      const cookieStore = await cookies();
=======
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      // Get token from cookies
      const cookieStore = cookies();
>>>>>>> b13b040ad3b491fbe3f9f90a5f7b60294a51321f
      const token = cookieStore.get("token")?.value;

      if (!token) {
        throw new UploadThingError("Unauthorized: No token provided");
      }

      // Decode token (no secret needed if it's not signed locally)
<<<<<<< HEAD
      let decoded: DecodedToken | null;
      try {
        decoded = jwt.decode(token) as DecodedToken;
      } catch {
=======
      let decoded: any;
      try {
        decoded = jwt.decode(token);
      } catch (err) {
>>>>>>> b13b040ad3b491fbe3f9f90a5f7b60294a51321f
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
<<<<<<< HEAD
      return { 
        userId: metadata.userId,
        file: {
          url: file.url,
          name: file.name
        }
      };
=======
      return { userId: metadata.userId, file };
>>>>>>> b13b040ad3b491fbe3f9f90a5f7b60294a51321f
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;