
"use client";

import BgGradient from "@/components/common/BgGradient";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { Plus, FileText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";

interface Summary {
  _id: string;
  fileName: string;
  summary: string;
  createdAt: string;
  status?: string;
}

export default function DashboardPage() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    async function fetchSummaries() {
      try {
        const apiBase = (
          process.env.NEXT_PUBLIC_API_BASE ||
          "https://summerizer-api.vercel.app/"
        ).replace(/\/$/, "");

        const response = await axios.get(`${apiBase}/api/summary/${userId}`, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("📡 API Fetch Response:", response.data.data);
        if (response.data.success) {
          setSummaries(response.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching summaries:", err);
      }
    }

    if (userId) {
      fetchSummaries();
    }
  }, [userId]);

  // --- Delete Summary Function ---
  async function deleteSummary(summaryId: string) {
    try {
      const apiBase = (
        process.env.NEXT_PUBLIC_API_BASE || "https://summerizer-api.vercel.app/"
      ).replace(/\/$/, "");

      const response = await axios.delete(
        `${apiBase}/api/summary/${summaryId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("🗑️ API Delete Response:", response.data);
      if (response.data.success) {
        setSummaries((prev) => prev.filter((s) => s._id !== summaryId));
      }
    } catch (err) {
      console.error("Error deleting summary:", err);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-100 via-teal-100 to-cyan-100">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200">
        <div className="container mx-auto flex flex-col gap-10 py-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Your Summaries
              </h1>
              <p className="mt-1 text-gray-600 text-sm sm:text-base">
                Transform your PDFs into concise, actionable insights ✨
              </p>
            </div>
            <Button
              asChild
              className="rounded-2xl px-5 py-2 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 shadow-md hover:from-green-600 hover:to-green-800 hover:scale-105 transition-all duration-300"
            >
              <Link href="/upload" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Summary
              </Link>
            </Button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {summaries.map((summary) => (
              <div
                key={summary._id}
                className="group bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                {/* Title & Time */}
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-rose-50 group-hover:bg-rose-100 transition">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-900">
                      {summary.fileName}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {new Date(summary.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Description (optional) */}
                {/* <p className="mt-4 text-sm text-gray-700 line-clamp-3">
              {summary.summary.summary}
            </p> */}

                {/* Status + Actions */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="inline-block text-xs sm:text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium cursor-pointer">
                    {summary.status || "Completed"}
                  </span>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteSummary(summary._id)}
                    className="hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BgGradient>
    </main>
  );
}
