"use server";

import gemini from "@/lib/gemini";
import fetchAndExtractPdfText from "@/lib/langChain";

const generatePdfSummary = async (
  uploadResponse: {
    serverData: {
      userId: string;
      file: {
        url: string;
        name: string;
      };
    };
  }[]
) => {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "Invalid file URL",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    let summary: string | null = null;
    try {
      const geminiResult = await gemini(pdfText);
      summary = geminiResult.summary; // <-- FIXED: extract summary string
    } catch (error) {
      console.error("Error generating summary with Gemini:", error);
      return {
        success: false,
        message: "Gemini processing failed",
        data: null,
      };
    }

    return {
      success: true,
      message: "PDF processed successfully",
      data: { userId, fileName, summary }, // Added fileName here
    };
  } catch (error) {
    console.error("Error processing PDF:", error);
    return {
      success: false,
      message: "File processing failed",
      data: null,
    };
  }
};

export default generatePdfSummary;
