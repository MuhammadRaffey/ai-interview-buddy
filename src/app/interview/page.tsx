"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaQuestionCircle,
  FaSpinner,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function InterviewComponent() {
  const [role, setRole] = useState<string>("Software Eng");
  const [questionType, setQuestionType] = useState<string>("Technical");
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize questions from query string if present
    const questionsFromQuery = searchParams.get("questions");
    if (questionsFromQuery) {
      setQuestions(JSON.parse(decodeURIComponent(questionsFromQuery)));
    }
  }, [searchParams]);

  const fetchQuestions = async () => {
    if (!role || !numQuestions) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/interview-buddy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, questionType, numQuestions }),
      });

      const data = await response.json();

      if (response.ok) {
        setQuestions(
          data.questions.split("\n").filter((q: string) => q.trim() !== "")
        );
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Unable to fetch questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 p-6 max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6 text-center flex items-center justify-center gap-3">
          <FaQuestionCircle className="text-blue-500" />
          AI Interview Buddy
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label htmlFor="role" className="block text-sm font-medium">
              Job Role
            </label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter Job Role"
              className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium">
              Question Type
            </label>
            <select
              id="type"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
            >
              <option value="Behavioral">Behavioral</option>
              <option value="Technical">Technical</option>
              <option value="Case Study">Case Study</option>
            </select>
          </div>
          <div>
            <label htmlFor="numQuestions" className="block text-sm font-medium">
              Number of Questions
            </label>
            <input
              id="numQuestions"
              type="number"
              min="1"
              max="20"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value) || 1)}
              className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
            />
          </div>
          <button
            onClick={fetchQuestions}
            className={`w-full p-2 rounded text-white flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <FaCheck />
                Generate Questions
              </>
            )}
          </button>
        </div>
        <ul className="mt-6 space-y-4">
          {questions.map((q, index) => (
            <motion.li
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgb(31, 41, 55)",
              }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-gray-700 rounded border border-gray-600 flex justify-between items-center"
            >
              <span>{q}</span>
              <button
                onClick={() =>
                  router.push(
                    `/interview/answer/${encodeURIComponent(
                      q
                    )}?questions=${encodeURIComponent(
                      JSON.stringify(questions)
                    )}`
                  )
                }
                className="text-blue-500 hover:text-blue-700"
              >
                <FaArrowRight size={20} />
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterviewComponent />
    </Suspense>
  );
}
