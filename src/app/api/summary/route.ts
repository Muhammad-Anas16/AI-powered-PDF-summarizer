import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Summary from "@/models/Summary";
import { verifyAuthToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectMongo();
    const body = await req.json();

    // ✅ Get JWT token from Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAuthToken(token);

    if (!decoded?.id) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const newSummary = new Summary({
      userId: decoded.id,
      fileName: body.fileName,
      pdfText: body.pdfText,
      summary: body.summary,
      importantPoints: body.importantPoints || [],
      answers: body.answers || [],
    });

    const savedSummary = await newSummary.save();

    return NextResponse.json(
      { success: true, data: savedSummary },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}