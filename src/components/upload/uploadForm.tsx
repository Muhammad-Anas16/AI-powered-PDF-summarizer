"use client";

import React from "react";
import UploadFormInput from "./uploadFormInput";
import { z } from "zod";

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
  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File | null;

    // console.log("Uploaded file:", file);

    const validatedField = schema.safeParse({ file });

    if (!validatedField.success) {
      console.log("Invalid Files");
      return;
    }

    console.log("validatedField : ", validatedField);
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto:">
      <UploadFormInput onSubmit={HandleSubmit} />
    </div>
  );
};

export default UploadForm;
