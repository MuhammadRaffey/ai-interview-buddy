"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  FileQuestion,
  MessageCircle,
  Copy,
  CheckCircle,
} from "lucide-react";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AnswerPage() {
  const params = useParams();
  const router = useRouter();
  const questionNumber = Number(params?.questionNumber);
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!questionNumber) {
      setError("Question number is missing from the URL!");
      setTimeout(() => router.push("/interview"), 2000);
      return;
    }

    const storedQuestions = localStorage.getItem("interviewPrep");
    if (!storedQuestions) {
      setError("Questions are missing. Please generate them first.");
      setTimeout(() => router.push("/interview"), 2000);
      return;
    }

    try {
      const questions = JSON.parse(storedQuestions);
      const questionContent = questions[questionNumber - 1];

      if (!questionContent) {
        setError("Invalid question number!");
        setTimeout(() => router.push("/interview"), 2000);
        return;
      }

      setQuestion(questionContent);

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

  const handleCopyAnswer = () => {
    if (answer) {
      navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 md:p-10">
            {/* Error Handling */}
            <Alert type="error" message={error || ""} show={!!error} />

            {/* Question Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileQuestion className="text-blue-400" size={28} />
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Interview Question #{questionNumber}
                </h1>
              </div>

              {question ? (
                <Card variant="default" className="p-6">
                  <p className="text-gray-200 text-lg leading-relaxed">
                    {question}
                  </p>
                </Card>
              ) : (
                <p className="text-red-400">No question available.</p>
              )}
            </motion.div>

            {/* Answer Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-green-400" size={28} />
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
                    Suggested Answer
                  </h2>
                </div>

                {answer && !loading && (
                  <motion.button
                    onClick={handleCopyAnswer}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all"
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={18} className="text-green-400" />
                        <span className="text-sm font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        <span className="text-sm font-medium">Copy</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16"
                  >
                    <LoadingSpinner
                      size="lg"
                      text="Generating comprehensive answer..."
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card variant="default" className="p-6">
                      <div className="prose prose-invert prose-blue max-w-none markdown-content">
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore - React Markdown type compatibility with React 19 */}
                        <ReactMarkdown>
                          {answer || "No answer available."}
                        </ReactMarkdown>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Navigation Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <Button
                onClick={() => router.push("/interview")}
                variant="secondary"
                icon={ArrowLeft}
                className="w-full"
              >
                Back to Interview Prep
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
