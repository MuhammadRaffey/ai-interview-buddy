"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function AnswerPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const question = decodeURIComponent(
    Array.isArray(params?.question)
      ? params.question[0]
      : params?.question || ""
  );
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    // Decode questions from the query string
    const questionsFromQuery = searchParams.get("questions");
    if (questionsFromQuery) {
      setQuestions(JSON.parse(decodeURIComponent(questionsFromQuery)));
    }

    const fetchAnswer = async () => {
      try {
        const response = await fetch(
          `/api/interview-buddy/${encodeURIComponent(question)}`
        );
        const data = await response.json();

        if (response.ok) {
          setAnswer(data.answer);
        } else {
          setAnswer("Failed to fetch the answer.");
        }
      } catch (error) {
        console.error("Error fetching answer:", error);
        setAnswer("An error occurred while fetching the answer.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [question, searchParams]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold mb-4">Question:</h1>
          <p className="text-lg bg-gray-700 p-4 rounded border border-gray-600 mb-6">
            {question}
          </p>
          {loading ? (
            <p className="text-blue-400">Fetching answer...</p>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">Answer:</h2>
              <div className="text-lg bg-gray-700 p-4 rounded border border-gray-600 ">
                <ReactMarkdown>
                  {answer || "No answer available."}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Go Back Button */}
          <button
            onClick={() =>
              router.push(
                `/interview?questions=${encodeURIComponent(
                  JSON.stringify(questions)
                )}`
              )
            }
            className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Go Back to Questions
          </button>
        </motion.div>
      </div>
    </div>
  );
}
