import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "x-ai/grok-4-fast:free",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({ response: completion.choices[0].message });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}