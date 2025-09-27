import { createWorker } from "tesseract.js";

export async function extractTextFromImage(file) {
  if (!file) throw new Error("No image provided");

  // Convert File/Blob → Object URL
  const imageUrl = typeof file === "string" ? file : URL.createObjectURL(file);

  // Create a worker for English OCR
  const worker = await createWorker("eng");

  // Run OCR
  const result = await worker.recognize(imageUrl);

  // Clean up worker
  await worker.terminate();

  return result.data.text;
}