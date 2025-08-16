"use client";

import React from "react";
import UploadFormInput from "./uploadFormInput";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";

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
  const { toast } = useToast();
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded successfully!");
    },

    onUploadError: (err) => {
      toast({
        title: "Upload Error",
        description: `An error occurred during upload: ${err.message}`,
        variant: "destructive",
      });
    },

    onUploadBegin: ({ file }: any) => {
      console.log("Upload has begun for", file);
    },
  });

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      console.log("No file uploaded or invalid file");
      toast({
        title: "❌ Something went wrong",
        description: `No file uploaded or invalid file`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "📑 Processing",
      description: `AI is reading your PDF...✨ Please wait.`,
      variant: "destructive",
    });

    const validatedField = schema.safeParse({ file });

    if (!validatedField.success) {
      console.log("Validation Errors:", validatedField.error.flatten());
      toast({
        title: "❌ Something went wrong",
        description: `Please use a different file.`,
        variant: "destructive",
      });
      return;
    }

    console.log("Validated Field:", validatedField.data);

    const resp = startUpload([file]);

    if (!resp) {
      console.log("Upload failed to start");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={HandleSubmit} />
    </div>
  );
};

export default UploadForm;
