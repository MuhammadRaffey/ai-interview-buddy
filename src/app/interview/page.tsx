"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Target,
  Settings,
  Globe,
  BookOpen,
  Zap,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

// Define types for better type safety
type QuestionType = "Technical" | "Behavioral" | "Case Study";
type InterviewQuestion = string;

function InterviewPreparationDashboard() {
  // Typed state variables
  const [role, setRole] = useState<string>("Software Engineer");
  const [questionType, setQuestionType] = useState<QuestionType>("Technical");
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Load saved questions on component mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem("interviewPrep");
    if (savedQuestions) {
      try {
        const parsedQuestions = JSON.parse(savedQuestions);
        setQuestions(parsedQuestions);
      } catch (err) {
        console.error("Failed to parse saved questions", err);
      }
    }
  }, []);

  // Fetch interview questions
  const generateInterviewQuestions = async () => {
    // Reset previous states
    setLoading(true);
    setError(null);

    // Validation
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

  // Reset questions and local storage
  const resetInterviewPrep = () => {
    setQuestions([]);
    localStorage.removeItem("interviewPrep");
  };

  // Navigate to answer page
  const navigateToAnswer = (questionIndex: number) => {
    router.push(`/interview/answer/${questionIndex}`);
  };

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
          className="max-w-2xl mx-auto bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700"
        >
          <header className="text-center mb-8 flex items-center justify-center gap-4">
            <Rocket className="text-blue-400" size={36} />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Interview Maestro
            </h1>
          </header>

          {/* Configuration Section */}
          <div className="space-y-6">
            {/* Role Input */}
            <div>
              <label
                htmlFor="role"
                className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300"
              >
                <Target size={16} className="text-blue-400" />
                Job Role
              </label>
              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter your target role"
                className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Question Type Selector */}
            <div>
              <label
                htmlFor="questionType"
                className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300"
              >
                <BookOpen size={16} className="text-green-400" />
                Interview Focus
              </label>
              <select
                id="questionType"
                value={questionType}
                onChange={(e) =>
                  setQuestionType(e.target.value as QuestionType)
                }
                className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:ring-2 focus:ring-green-500 transition-all"
              >
                <option value="Technical">Technical Depth</option>
                <option value="Behavioral">Behavioral Insights</option>
                <option value="Case Study">Strategic Analysis</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div>
              <label
                htmlFor="numQuestions"
                className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300"
              >
                <Settings size={16} className="text-purple-400" />
                Question Quantity
              </label>
              <input
                id="numQuestions"
                type="number"
                min={1}
                max={20}
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value) || 1)}
                className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                onClick={generateInterviewQuestions}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex-1 flex items-center justify-center gap-2 p-3 rounded-lg 
                  ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  } transition-all
                `}
              >
                {loading ? (
                  <>
                    <Zap className="animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Globe />
                    Generate Questions
                  </>
                )}
              </motion.button>

              {questions.length > 0 && (
                <motion.button
                  onClick={resetInterviewPrep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg flex items-center gap-2"
                >
                  <RefreshCw />
                  Reset
                </motion.button>
              )}
            </div>
          </div>

          {/* Questions List */}
          <AnimatePresence>
            {questions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 space-y-4"
              >
                {questions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700/50 p-4 rounded-lg flex justify-between items-center border border-gray-600"
                  >
                    <span className="flex-grow pr-4">{`${
                      index + 1
                    }. ${question}`}</span>
                    <motion.button
                      onClick={() => navigateToAnswer(index + 1)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <ArrowRight />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default function InterviewPage() {
  return (
    <Suspense fallback={<div>Loading Interview Prep...</div>}>
      <InterviewPreparationDashboard />
    </Suspense>
  );
}
