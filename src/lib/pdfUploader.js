// src/lib/pdfUploader.js

export async function uploadPdfAndExtractText(file) {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to process PDF");
  }

  const data = await res.json();
  return {
    text: data.text || "",
    pages: data.pages || 0,
    info: data.info || {},
  };
}