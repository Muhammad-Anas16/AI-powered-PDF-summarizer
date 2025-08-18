"use client";

import React from "react";
import UploadFormInput from "./uploadFormInput";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import generatePdfSummary from "@/action/uploadAction";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File must be a PDF",
    }),
});

const UploadForm = () => {
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded successfully!");
    },

    onUploadError: (err) => {
      toast.error(`An error occurred during upload: ${err.message}`);
    },

    onUploadBegin: ({ file }: any) => {
      console.log("Upload has begun for", file);
    },
  });

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      console.log("No file uploaded or invalid file");
      toast.error("❌ Something went wrong: No file uploaded or invalid file");
      return;
    }

    toast.info("📑 Processing: AI is reading your PDF...✨ Please wait.");

    const validatedField = schema.safeParse({ file });

    if (!validatedField.success) {
      console.log("Validation Errors:", validatedField.error.flatten());
      toast.error("❌ Something went wrong: Please use a different file.");
      return;
    }

    console.log("Validated Field:", validatedField.data);

    // Await the upload response
    const resp = await startUpload([file]);

    if (!resp || resp.length === 0) {
      console.log("Upload failed to start");
      return;
    }

    // Pass only the first uploaded file as a single-element array
    const summary = await generatePdfSummary([resp[0]]);
    console.log("PDF Summary in UploadForm.tsx =>:", {summary});
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={HandleSubmit} />
    </div>
  );
};

export default UploadForm;
