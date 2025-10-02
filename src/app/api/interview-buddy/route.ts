import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.GROK_API_KEY;

if (!apiKey) {
  throw new Error("GROK_API_KEY is not defined in the environment variables");
}

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { role, questionType, numQuestions } = await request.json();

    // Validation
    if (!role || typeof role !== "string" || role.trim().length === 0) {
      return NextResponse.json(
        { error: "Role is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    if (!questionType || typeof questionType !== "string") {
      return NextResponse.json(
        { error: "Question type is required and must be a string." },
        { status: 400 }
      );
    }

    const validQuestionTypes = ["Technical", "Behavioral", "Case Study"];
    if (!validQuestionTypes.includes(questionType)) {
      return NextResponse.json(
        {
          error: `Invalid question type. Must be one of: ${validQuestionTypes.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    if (
      !numQuestions ||
      isNaN(numQuestions) ||
      numQuestions < 1 ||
      numQuestions > 20
    ) {
      return NextResponse.json(
        {
          error: "Number of questions must be a valid number between 1 and 20.",
        },
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
          "You are an expert AI interview coach with years of experience in recruitment and talent assessment. Generate professional, relevant interview questions based on the user's target role and question type. Format your response as a numbered list with clear, concise questions. Focus on questions that assess real skills and competencies.",
      },
      {
        role: "user",
        content: `I am preparing for a ${role.trim()} position. Please generate exactly ${numQuestions} ${questionType} interview questions. Number each question from 1 to ${numQuestions}. Make them relevant, practical, and commonly asked in professional interviews for this role.`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages,
      temperature: 0.3,
      max_tokens: 2000,
    });

    const content =
      response.choices[0]?.message?.content || "No response generated.";

    // Convert content into a JSON object with numbered keys
    const questionsArray = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const questionsObject: Record<string, string> = {};
    questionsArray.forEach((question, index) => {
      questionsObject[(index + 1).toString()] = question;
    });

    return NextResponse.json({
      questions: questionsObject,
      metadata: {
        role: role.trim(),
        questionType,
        count: Object.keys(questionsObject).length,
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
            : "An unknown error occurred while generating the interview questions.",
      },
      { status: 500 }
    );
  }
}
