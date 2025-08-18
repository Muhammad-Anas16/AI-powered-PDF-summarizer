"use server";

import fetchAndExtractPdfText from "@/lib/langChain";

const generatePdfSummary = async (
  uploadResponce: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) => {
  if (!uploadResponce) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponce[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("pdfText in Upload-Action =>", pdfText);
    return {
      success: true,
      message: "PDF processed successfully",
      data: pdfText,
    };
  } catch (error) {
    return {
      success: false,
      message: "File processing failed",
      data: null,
    };
  }
};

export default generatePdfSummary;
