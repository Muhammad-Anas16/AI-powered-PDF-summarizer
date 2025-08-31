// src/app/dashboard/page.tsx
"use client"; // Make this client component because it uses interactive UI

import BgGradient from "@/components/common/BgGradient";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";

const summaries = [
  {
    id: 1,
    title: "Sous Sol Bar Menu",
    time: "16 minutes ago",
    description:
      "Sip, Savor, Repeat: Your Ultimate Drink Guide 🍹 Enjoy our carefully crafted...",
    status: "Completed",
  },
  {
    id: 2,
    title: "Next.js Hot Tips Cheatsheet",
    time: "1 day ago",
    description:
      "⚡ Level Up Your Next.js Skills! 🚀 Master Next.js and build amazing web apps with...",
    status: "Completed",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200">
        <div className="container mx-auto flex flex-col gap-6 py-10">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Your Summaries</h1>
            <p className="text-gray-600">
              Transform your PDFs into concise, actionable insights
            </p>
            <Button
              variant={"link"}
              className="w-fit bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map((summary) => (
              <div
                key={summary.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-rose-600" />
                  <div>
                    <h2 className="font-semibold text-lg">{summary.title}</h2>
                    <p className="text-sm text-gray-500">{summary.time}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                  {summary.description}
                </p>
                <span className="mt-4 inline-block text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full w-fit">
                  {summary.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </BgGradient>
    </main>
  );
}