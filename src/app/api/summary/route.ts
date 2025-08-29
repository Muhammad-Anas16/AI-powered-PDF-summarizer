import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Summary from "@/models/Summary";
import { verifyAuthToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectMongo();
    const body = await req.json();

    // ✅ Get token from cookies manually
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = new Map(
      cookieHeader
        .split(";")
        .map((c) => c.trim().split("="))
        .map(([k, v]) => [k, v])
    );

    const token = cookies.get("userToken");
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided in cookies" },
        { status: 401 }
      );
    }

    const decoded = verifyAuthToken(token);
    if (!decoded?.id) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // Save summary
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