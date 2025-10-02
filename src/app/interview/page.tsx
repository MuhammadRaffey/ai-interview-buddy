"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Target,
  Settings,
  BookOpen,
  RefreshCw,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Alert from "@/components/ui/Alert";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type QuestionType = "Technical" | "Behavioral" | "Case Study";
type InterviewQuestion = string;

const InterviewPreparationDashboard = () => {
  const [role, setRole] = useState<string>("Software Engineer");
  const [questionType, setQuestionType] = useState<QuestionType>("Technical");
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Removed auto-loading of saved questions
  // Questions will only appear after explicitly generating them
  useEffect(() => {
    // Clear any stale questions from localStorage on mount
    localStorage.removeItem("interviewPrep");
  }, []);

  const generateInterviewQuestions = async () => {
    setLoading(true);
    setError(null);

    if (!role.trim() || numQuestions < 1 || numQuestions > 20) {
      setError("Please provide a valid role and number of questions (1-20).");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/interview-buddy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          questionType,
          numQuestions,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const processedQuestions = Object.values(data.questions)
          .map((q: unknown) =>
            typeof q === "string" ? q.replace(/^\d+\.\s*/, "").trim() : ""
          )
          .filter((q) => q !== "");

        setQuestions(processedQuestions);
        localStorage.setItem(
          "interviewPrep",
          JSON.stringify(processedQuestions)
        );
      } else {
        setError(data.error || "An unexpected error occurred");
      }
    } catch (err) {
      console.error("Question generation error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetInterviewPrep = () => {
    setQuestions([]);
    localStorage.removeItem("interviewPrep");
    setError(null);
  };

  const navigateToAnswer = (questionIndex: number) => {
    router.push(`/interview/answer/${questionIndex}`);
  };

  const questionTypeOptions = [
    { value: "Technical", label: "🔧 Technical Depth" },
    { value: "Behavioral", label: "💡 Behavioral Insights" },
    { value: "Case Study", label: "📊 Strategic Analysis" },
  ];

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
            {/* Header */}
            <header className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Rocket className="text-blue-400" size={42} />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  Interview Preparation
                </h1>
              </div>
              <p className="text-gray-400 text-lg">
                Configure your interview prep session and generate customized
                questions
              </p>
            </header>

            {/* Configuration Section */}
            <div className="space-y-6 mb-8">
              <Input
                id="role"
                label="Job Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Software Engineer, Product Manager, Data Scientist"
                icon={Target}
              />

              <Select
                id="questionType"
                label="Interview Focus"
                value={questionType}
                onChange={(e) =>
                  setQuestionType(e.target.value as QuestionType)
                }
                options={questionTypeOptions}
                icon={BookOpen}
              />

              <Input
                id="numQuestions"
                label="Number of Questions"
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value) || 1)}
                min={1}
                max={20}
                icon={Settings}
              />
            </div>

            {/* Error Display */}
            <Alert type="error" message={error || ""} show={!!error} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button
                onClick={generateInterviewQuestions}
                disabled={loading}
                icon={loading ? undefined : Sparkles}
                className="flex-1"
              >
                {loading ? "Generating..." : "Generate Questions"}
              </Button>

              {questions.length > 0 && (
                <Button
                  onClick={resetInterviewPrep}
                  variant="danger"
                  icon={RefreshCw}
                >
                  Reset
                </Button>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="py-12">
                <LoadingSpinner
                  size="lg"
                  text="Generating your personalized questions..."
                />
              </div>
            )}

            {/* Questions List */}
            <AnimatePresence>
              {!loading && questions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="text-green-400" size={24} />
                    <h2 className="text-2xl font-bold text-white">
                      Your Interview Questions ({questions.length})
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {questions.map((question, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Card hover variant="default">
                          <div className="p-5 flex items-center justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </span>
                              <p className="text-gray-200 flex-1 leading-relaxed">
                                {question}
                              </p>
                            </div>
                            <motion.button
                              onClick={() => navigateToAnswer(index + 1)}
                              whileHover={{ scale: 1.1, x: 5 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-400/10"
                              aria-label="View Answer"
                            >
                              <ArrowRight size={24} />
                            </motion.button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {!loading && questions.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Sparkles className="text-gray-600 mx-auto mb-4" size={48} />
                <p className="text-gray-400 text-lg">
                  Generate questions to start your interview preparation
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewPreparationDashboard;
