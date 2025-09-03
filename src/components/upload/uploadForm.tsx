// "use client";

// import React, { useEffect } from "react";
// import UploadFormInput from "./uploadFormInput";
// import { z } from "zod";
// import { useUploadThing } from "@/utils/uploadthing";
// import { toast } from "sonner";
// import generatePdfSummary from "@/action/uploadAction";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { useRouter } from "next/navigation";

// const schema = z.object({
//   file: z
//     .instanceof(File, { message: "Invalid file" })
//     .refine((file) => file.size <= 20 * 1024 * 1024, {
//       message: "File size must be less than 20MB",
//     })
//     .refine((file) => file.type === "application/pdf", {
//       message: "File must be a PDF",
//     }),
// });

// type SummaryData = {
//   userId: string;
//   fileName: string;
//   pdfText: string;
//   summary: string | null;
// };

// type SummaryResponse =
//   | { success: false; message: string; data: null }
//   | { success: true; message: string; data: SummaryData };

// const UploadForm: React.FC = () => {
//   const userId = useSelector((state: RootState) => state.user.userId);
//   const router = useRouter();

//   useEffect(() => {
//     console.log("update to redux state menegment");
//   }, [userId]);

//   const { startUpload } = useUploadThing("pdfUploader", {
//     onClientUploadComplete: () => console.log("✅ Uploaded successfully!"),
//     onUploadError: (err) => {
//       toast.error(`❌ Upload error: ${err.message}`);
//     },
//     onUploadBegin: (fileName: string) =>
//       console.log("⏳ Upload has begun for", fileName),
//   });

//   const HandleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     e.preventDefault();

//     if (!userId) {
//       toast.error("❌ User ID is required.");
//       return;
//     }

//     const formData = new FormData(e.currentTarget);
//     const file = formData.get("file");

//     if (!file || !(file instanceof File)) {
//       toast.error("❌ No file uploaded or invalid file");
//       return;
//     }

//     const validatedField = schema.safeParse({ file });
//     if (!validatedField.success) {
//       toast.error("❌ Please upload a valid PDF under 20MB.");
//       return;
//     }

//     toast.info("📑 Processing: AI is reading your PDF...✨ Please wait.");

//     try {
//       // 1️⃣ Upload file
//       const resp = await startUpload([file]);
//       if (!resp || resp.length === 0) {
//         toast.error("❌ Upload failed.");
//         return;
//       }

//       const summary = (await generatePdfSummary([resp[0]])) as SummaryResponse;
//       if (!summary.success || !summary.data) {
//         toast.error("❌ Failed to process PDF.");
//         return;
//       }

//       const apiBase =
//         process.env.NEXT_PUBLIC_API_BASE ||
//         "https://summerizer-api.vercel.app/";

//       // ✅ Always ensure summary.summary is a string
//       const payload = {
//         userId,
//         fileName: summary.data.fileName,
//         summary: { summary: summary.data.summary || "No summary available" },
//       };

//       const saveResponse = await axios.post(`${apiBase}api/summary`, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("📡 API Save Response:", saveResponse.data.fileName);
//       toast.success("✅ PDF processed and saved successfully!");

//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 1000);
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         console.error(
//           "❌ API save error:",
//           error.response?.data || error.message
//         );
//         toast.error(
//           `❌ Failed to save summary: ${
//             error.response?.data?.error || error.message
//           }`
//         );
//       } else if (error instanceof Error) {
//         console.error("❌ API save error:", error.message);
//         toast.error(`❌ Failed to save summary: ${error.message}`);
//       } else {
//         console.error("❌ API save error:", error);
//         toast.error("❌ Failed to save summary: Unknown error");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
//       <UploadFormInput onSubmit={HandleSubmit} />
//     </div>
//   );
// };

// export default UploadForm;

"use client";

import React, { useEffect } from "react";
import UploadFormInput from "./uploadFormInput";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import generatePdfSummary from "@/action/uploadAction";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

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

type SummaryData = {
  userId: string;
  fileName: string;
  pdfText: string;
  summary: string | null;
};

type SummaryResponse =
  | { success: false; message: string; data: null }
  | { success: true; message: string; data: SummaryData };

const UploadForm: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const router = useRouter();

  useEffect(() => {
    console.log("update to redux state management");
  }, [userId]);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => console.log("✅ Uploaded successfully!"),
    onUploadError: (err) => {
      toast.error(`❌ Upload error: ${err.message}`);
    },
    onUploadBegin: (fileName: string) =>
      console.log("⏳ Upload has begun for", fileName),
  });

  const HandleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!userId) {
      toast.error("❌ User ID is required.");
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
      // 1️⃣ Upload file
      const resp = await startUpload([file]);
      if (!resp || resp.length === 0) {
        toast.error("❌ Upload failed.");
        return;
      }

      // 2️⃣ Generate PDF summary and get PDF text
      const summaryResponse = (await generatePdfSummary([resp[0]])) as SummaryResponse;
      if (!summaryResponse.success || !summaryResponse.data) {
        toast.error("❌ Failed to process PDF.");
        return;
      }

      const pdfText = summaryResponse.data.pdfText || "";
      const words = pdfText.split(/\s+/);
      const wordCount = words.length;

      // Show total word count to user
      toast.info(`📝 Your PDF contains approximately ${wordCount} words.`);

      // 3️⃣ If long text → split into chunks of 500 words
      const chunks: string[] = [];
      for (let i = 0; i < words.length; i += 500) {
        const chunk = words.slice(i, i + 500).join(" ");
        chunks.push(chunk);
      }

      // 4️⃣ Process each chunk separately
      let combinedSummary = "";
      for (let i = 0; i < chunks.length; i++) {
        toast.info(`⏳ Summarizing chunk ${i + 1} of ${chunks.length}...`);
        const chunkSummaryResponse = (await generatePdfSummary([
          { ...resp[0], pdfText: chunks[i] },
        ])) as SummaryResponse;

        if (chunkSummaryResponse.success && chunkSummaryResponse.data?.summary) {
          combinedSummary += chunkSummaryResponse.data.summary + " ";
        } else {
          console.warn(`⚠️ Failed to summarize chunk ${i + 1}`);
        }
      }

      // 5️⃣ If single chunk → just use it, otherwise use combined
      const finalSummary =
        chunks.length === 1
          ? summaryResponse.data.summary || "No summary available"
          : combinedSummary.trim() || "No summary available";

      const apiBase =
        process.env.NEXT_PUBLIC_API_BASE ||
        "https://summerizer-api.vercel.app/";

      const payload = {
        userId,
        fileName: summaryResponse.data.fileName,
        summary: { summary: finalSummary },
      };

      const saveResponse = await axios.post(`${apiBase}api/summary`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("📡 API Save Response:", saveResponse.data.fileName);
      toast.success("✅ PDF processed and saved successfully!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "❌ API save error:",
          error.response?.data || error.message
        );
        toast.error(
          `❌ Failed to save summary: ${
            error.response?.data?.error || error.message
          }`
        );
      } else if (error instanceof Error) {
        console.error("❌ API save error:", error.message);
        toast.error(`❌ Failed to save summary: ${error.message}`);
      } else {
        console.error("❌ API save error:", error);
        toast.error("❌ Failed to save summary: Unknown error");
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={HandleSubmit} />
    </div>
  );
};

export default UploadForm;

