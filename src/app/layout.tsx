import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Interview Maestro - AI-Powered Interview Preparation",
  description:
    "Master your interviews with AI-generated personalized questions and expert answers. Prepare for technical, behavioral, and case study interviews.",
  keywords:
    "interview preparation, AI interview, technical interview, behavioral interview, interview questions",
  authors: [{ name: "Interview Maestro Team" }],
  openGraph: {
    title: "Interview Maestro - AI-Powered Interview Preparation",
    description:
      "Master your interviews with AI-generated personalized questions and expert answers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 via-black to-gray-900`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
