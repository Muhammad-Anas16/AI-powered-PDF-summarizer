const gemini = (pdfText: string) => {
  console.log("Gemini function called with text:", pdfText);
  return pdfText; // so whatever calls gemini still gets the text
};

export default gemini;