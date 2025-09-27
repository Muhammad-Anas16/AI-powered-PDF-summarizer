import { jsPDF } from "jspdf";

export function generatePDF(text, fileName = "document.pdf") {
  const doc = new jsPDF();
  const splitText = doc.splitTextToSize(text || "No content", 180);

  doc.setFontSize(12);
  doc.text(splitText, 20, 20);

  doc.save(fileName);
}