"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Rocket,
  ChevronRight,
  BookOpen,
  Target,
  Zap,
  TrendingUp,
  Award,
  Brain,
} from "lucide-react";
import Link from "next/link";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const features = [
    {
      icon: Target,
      title: "Personalized Questions",
      description:
        "Generate tailored interview questions based on your target role and expertise level",
      color: "text-blue-400",
    },
    {
      icon: Brain,
      title: "AI-Powered Answers",
      description:
        "Get comprehensive, well-structured answers powered by advanced AI technology",
      color: "text-purple-400",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description:
        "Monitor your preparation journey and improve with each practice session",
      color: "text-green-400",
    },
    {
      icon: Award,
      title: "Interview Ready",
      description:
        "Build confidence and master the art of interviewing with expert guidance",
      color: "text-yellow-400",
    },
  ];

  const stats = [
    { label: "Questions Generated", value: "10K+", icon: BookOpen },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
    { label: "Happy Users", value: "5K+", icon: Award },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <BackgroundEffects />

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`fixed inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0 ${
          isLoaded ? "opacity-30" : "opacity-0"
        }`}
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Main Heading */}
          <div className="flex justify-center items-center gap-4 mb-6">
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
              <Rocket className="text-blue-400" size={56} />
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Interview Maestro
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Your AI-powered interview preparation companion. Master interviews
            with personalized questions and expert answers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/interview">
              <Button size="lg" icon={ChevronRight}>
                Start Preparing Now
              </Button>
            </Link>
            <Button variant="ghost" size="lg" icon={Zap}>
              Learn More
            </Button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <Card hover>
                  <div className="p-6 text-center">
                    <stat.icon
                      className="text-blue-400 mx-auto mb-3"
                      size={32}
                    />
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
            >
              <Card hover>
                <div className="p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className={`${feature.color} bg-gray-800 p-3 rounded-xl`}
                    >
                      <feature.icon size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="max-w-3xl mx-auto" variant="gradient">
            <div className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Ace Your Next Interview?
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join thousands of successful candidates who prepared with
                Interview Maestro
              </p>
              <Link href="/interview">
                <Button size="lg" icon={Rocket}>
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
