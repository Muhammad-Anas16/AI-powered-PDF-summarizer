"use client";

import React from "react";
import UploadFormInput from "./uploadFormInput";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import generatePdfSummary from "@/action/uploadAction";
import Cookies from "js-cookie";

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

    const token = Cookies.get("token");
    if (!token) {
      toast.error("❌ You must be logged in to upload.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      toast.error("❌ No file uploaded or invalid file");
      return;
    }

    const validatedField = schema.safeParse({ file });
    if (!validatedField.success) {
      toast.error("❌ Please upload a valid PDF under 20MB.");
      return;
    }

    toast.info("📑 Processing: AI is reading your PDF...✨ Please wait.");

    try {
      const resp = await startUpload([file]);
      if (!resp || resp.length === 0) {
        toast.error("❌ Upload failed.");
        return;
      }

      // Only pass the first uploaded file to match your generatePdfSummary() type
      const summary = await generatePdfSummary([resp[0]]);
      console.log("PDF Summary:", summary);
      toast.success("✅ PDF processed successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("❌ Something went wrong during upload.");
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={HandleSubmit} />
    </div>
  );
};

export default UploadForm;