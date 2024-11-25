import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not defined in the environment variables");
}

const openai = new OpenAI({
  apiKey,
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await context.params;

    if (!questionId) {
      return NextResponse.json(
        { error: "Question ID is required in the route parameter." },
        { status: 400 }
      );
    }

    const question = decodeURIComponent(questionId);

    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [
      {
        role: "system",
        content:
          "You are an expert AI interview coach. Provide concise and accurate answers for interview questions.",
      },
      {
        role: "user",
        content: `Answer the following interview question: "${question}"`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.5,
    });

    const content =
      response.choices[0]?.message?.content || "No answer generated.";

    return NextResponse.json({ answer: content });
  } catch (error) {
    console.error("Error fetching answer:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unknown error occurred while fetching the answer.",
      },
      { status: 500 }
    );
  }
}
