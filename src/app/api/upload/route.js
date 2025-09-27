import { NextResponse } from "next/server";
import pdf from "pdf-parse-new";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert uploaded file → Buffer (in memory)
    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text from the entire PDF (all pages)
    const pdfData = await pdf(buffer);

    return NextResponse.json({ 
      text: pdfData.text,   // PDF text
      pages: pdfData.numpages, // number of pages
      info: pdfData.info    // metadata like Author, Title, etc.
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}