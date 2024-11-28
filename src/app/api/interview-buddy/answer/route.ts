import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not defined in the environment variables");
}

const openai = new OpenAI({
  apiKey,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required in the request body." },
        { status: 400 }
      );
    }
    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [
      {
        role: "system",
        content:
          "You are an expert AI interview coach. Provide professional and concise answers to interview questions.",
      },
      {
        role: "user",
        content: question,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.5,
    });

    const answer =
      response.choices[0]?.message?.content || "No answer generated.";

    return NextResponse.json({ answer });
  } catch (error: unknown) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unknown error occurred while generating the answer.",
      },
      { status: 500 }
    );
  }
}
