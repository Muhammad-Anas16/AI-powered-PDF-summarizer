import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export type GeminiResult = {
  summary: string;
  importantPoints: string[];
  answers: string[];
};

const gemini = async (pdfText: string): Promise<GeminiResult | string> => {
  // console.log("Gemini function called with text:", pdfText);

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant. 
Summarize the provided text, extract the most important points, 
and if there are questions, answer them using ONLY the summary.  

Respond ONLY in valid JSON like this:
{
  "summary": "short summary of the text",
  "importantPoints": ["point1", "point2", "..."],
  "answers": ["answers to any questions found in text (if any)"]
}`,
        },
        { role: "user", content: pdfText },
      ],
      max_tokens: 500,
      temperature: 0.4,
    });

    const aiResponse: string =
      chatCompletion.choices[0]?.message?.content ?? "";

    // Try parsing JSON safely
    try {
      const result: GeminiResult = JSON.parse(aiResponse);

      // Log structured output
      console.log("📌 AI Summary:", result.summary);
      console.log("📌 Important Points:", result.importantPoints);
      console.log("📌 Answers:", result.answers);

      return result;
    } catch {
      console.warn(
        "⚠️ AI did not return valid JSON, raw response:",
        aiResponse
      );
      return aiResponse;
    }
  } catch (error: unknown) {
    console.error("❌ Error in gemini:", error);
    throw error;
  }
};

export default gemini;
