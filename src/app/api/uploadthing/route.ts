import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Make sure UploadThing uses your custom key
process.env.UPLOADTHING_SECRET = process.env.UPLOADTHING_TOKEN;

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});