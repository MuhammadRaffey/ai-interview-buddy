"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Rocket, ChevronRight, BookOpen, Target } from "lucide-react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">
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

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0 ${
          isLoaded ? "opacity-50" : "opacity-0"
        }`}
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center text-white p-6 max-w-2xl mx-auto bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700"
      >
        <div className="flex justify-center items-center gap-4 mb-6">
          <Rocket className="text-blue-400" size={36} />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Interview Maestro
          </h1>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6 text-gray-300">
          <BookOpen className="text-green-400" size={20} />
          <p className="text-lg">
            Your AI-powered interview preparation companion
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 justify-center">
            <Target className="text-blue-400" size={20} />
            <span className="text-gray-200">
              Generate personalized interview questions
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <BookOpen className="text-green-400" size={20} />
            <span className="text-gray-200">
              Get AI-generated comprehensive answers
            </span>
          </div>
        </div>

        <motion.a
          href="/interview"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
        >
          Get Started
          <ChevronRight className="ml-2" />
        </motion.a>
      </motion.div>
    </div>
  );
}
