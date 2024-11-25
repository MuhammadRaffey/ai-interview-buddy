"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-white p-6"
      >
        <h1 className="text-4xl font-bold mb-4">
          Welcome to AI Interview Buddy
        </h1>
        <p className="text-lg mb-6">
          Your personalized AI-powered interview preparation assistant.
        </p>
        <a
          href="/interview"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
        >
          Get Started
        </a>
      </motion.div>
    </div>
  );
}
