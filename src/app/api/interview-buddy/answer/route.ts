import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.GROK_API_KEY;

if (!apiKey) {
  throw new Error("GROK_API_KEY is not defined in the environment variables");
}

const openai = new OpenAI({
  apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { question } = await req.json();

    // Validation
    if (
      !question ||
      typeof question !== "string" ||
      question.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Question is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    if (question.length > 1000) {
      return NextResponse.json(
        { error: "Question is too long. Maximum length is 1000 characters." },
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
          "You are an expert AI interview coach with deep knowledge across various industries and roles. Provide comprehensive, well-structured answers to interview questions using clean markdown formatting. Use proper markdown syntax: # for headers, ** for bold, - for bullet points, and numbered lists where appropriate. Never use HTML tags like <br> or pipe characters. Your answers should be clear, professional, and easy to read.",
      },
      {
        role: "user",
        content: `Please provide a comprehensive, well-formatted answer to this interview question: "${question.trim()}"\n\nRequirements:\n- Use clean markdown formatting (no HTML tags)\n- Start with a brief overview paragraph\n- Use ## for section headers\n- Use bullet points (-) or numbered lists (1., 2., 3.) for clarity\n- Include practical examples where relevant\n- End with a concise summary or key takeaway\n- Keep paragraphs readable and well-spaced\n\nFormat your entire response using proper markdown syntax only.`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages,
      temperature: 0.3,
      max_tokens: 3000,
    });

    const answer =
      response.choices[0]?.message?.content || "No answer generated.";

    return NextResponse.json({
      answer,
      metadata: {
        questionLength: question.trim().length,
        answerLength: answer.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    console.error("API Error:", error);

    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

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
