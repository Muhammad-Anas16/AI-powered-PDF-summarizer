import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const fetchAndExtractPdfText = async (fileUrl: string) => {
  console.log("fetchAndExtractPdfText URL => ", fileUrl);

  const response = await fetch(fileUrl);
  const blob = await response.blob();

  // Correct usage: pass the Blob directly to PDFLoader
  const loader = new PDFLoader(blob);

  const docs = await loader.load();

  return docs.map((doc) => doc.pageContent).join("\n");
};

export default fetchAndExtractPdfText;