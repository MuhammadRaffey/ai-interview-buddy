"use client";

import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import Link from "next/link";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <BackgroundEffects />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="p-12">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8"
            >
              <Search className="text-blue-400 mx-auto" size={120} />
            </motion.div>

            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">
              404
            </h1>

            <h2 className="text-3xl font-bold text-white mb-4">
              Page Not Found
            </h2>

            <p className="text-gray-400 text-lg mb-8">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It
              might have been moved or deleted.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button icon={Home} size="lg">
                  Go Home
                </Button>
              </Link>
              <Link href="/interview">
                <Button variant="ghost" size="lg">
                  Interview Prep
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
