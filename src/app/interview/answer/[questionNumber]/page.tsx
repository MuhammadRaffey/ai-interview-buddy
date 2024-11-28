"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Zap, FileQuestion, MessageCircle } from "lucide-react";

export default function AnswerPage() {
  const params = useParams();
  const router = useRouter();
  const questionNumber = Number(params?.questionNumber);
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!questionNumber) {
      setError("Question number is missing from the URL!");
      setTimeout(() => router.push("/interview"), 2000);
      return;
    }

    // Fetch questions from localStorage
    const storedQuestions = localStorage.getItem("interviewPrep");
    if (!storedQuestions) {
      setError("Questions are missing. Please generate them first.");
      setTimeout(() => router.push("/interview"), 2000);
      return;
    }

    try {
      const questions = JSON.parse(storedQuestions);

      // Get the specific question using the question number
      const questionContent = questions[questionNumber - 1];
      if (!questionContent) {
        setError("Invalid question number!");
        setTimeout(() => router.push("/interview"), 2000);
        return;
      }

      setQuestion(questionContent);

      // Fetch answer from OpenAI
      const fetchAnswer = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch("/api/interview-buddy/answer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: questionContent }),
          });

          const data = await response.json();
          if (response.ok) {
            setAnswer(data.answer);
          } else {
            setError(data.error || "Failed to fetch the answer.");
          }
        } catch (error) {
          console.error("Error fetching answer:", error);
          setError("Network error. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchAnswer();
    } catch (parseError: unknown) {
      setError("Error parsing stored questions. Please regenerate.");
      console.error(parseError);

      setTimeout(() => router.push("/interview"), 2000);
    }
  }, [questionNumber, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-gray-100 relative overflow-hidden">
      {/* Animated Background Particles */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700"
        >
          {/* Error Handling */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg text-center mb-6"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Question Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <FileQuestion className="text-blue-400" size={24} />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Interview Question
              </h1>
            </div>

            {question ? (
              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 text-lg">
                {question}
              </div>
            ) : (
              <p className="text-red-500">No question available.</p>
            )}
          </motion.div>

          {/* Answer Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <MessageCircle className="text-green-400" size={24} />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
                Suggested Answer
              </h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-6 bg-gray-700/50 rounded-lg">
                <Zap className="animate-pulse text-blue-400 mr-2" />
                <span className="text-blue-400">Generating answer...</span>
              </div>
            ) : (
              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 text-lg">
                <ReactMarkdown>
                  {answer || "No answer available."}
                </ReactMarkdown>
              </div>
            )}
          </motion.div>

          {/* Navigation Button */}
          <motion.button
            onClick={() => router.push("/interview")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            <ArrowLeft />
            Back to Interview Prep
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
