import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not defined in the environment variables");
}

const openai = new OpenAI({
  apiKey: apiKey,
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { role, questionType, numQuestions } = await request.json();

    if (!role || !questionType || !numQuestions || isNaN(numQuestions)) {
      return NextResponse.json(
        {
          error:
            "All fields ('role', 'questionType', and 'numQuestions') are required, and 'numQuestions' must be a valid number.",
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
          "You are an expert AI interview coach. Generate a list of professional interview questions based on the user's role and type of question they want (e.g., behavioral, technical). Keep the tone professional and concise. JUST REPLY WITH THE QUESTIONS NOTHING EXTRA!!!!",
      },
      {
        role: "user",
        content: `I am preparing for a ${role} role. Please generate ${numQuestions} ${questionType} interview questions in a list format.`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.2,
    });

    const content =
      response.choices[0]?.message?.content || "No response generated.";

    // Convert content into a JSON object with numbered keys
    const questionsArray = content
      .split("\n") // Split into lines
      .map((line) => line.trim()) // Trim each line
      .filter((line) => line.length > 0); // Remove empty lines

    const questionsObject: Record<string, string> = {};
    questionsArray.forEach((question, index) => {
      questionsObject[(index + 1).toString()] = question;
    });
    // console.log(questionsObject);

    return NextResponse.json({ questions: questionsObject });
  } catch (error: unknown) {
    console.error("API Error:", error);
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
