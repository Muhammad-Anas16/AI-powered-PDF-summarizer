"use client";

import React, { useEffect, useState } from "react";
import { use } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import BgGradient from "@/components/common/BgGradient";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

// Define the type according to how your Redux store actually stores summaries
interface SummaryItem {
  _id: string;
  fileName: string;
  createdAt: string;
  // This can be either a string or an object with a summary field.
  summary: string | { summary: string };
}

interface SummerizePageProps {
  params: Promise<{ id: string }>;
}

const SummerizePage = ({ params }: SummerizePageProps) => {
  const { id } = use(params);
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  const [progress, setProgress] = useState(0);

  const summaries = useSelector(
    (state: RootState) => state.summaries.summaries
  ) as SummaryItem[];

  const summary = summaries.find((s) => s._id === id);

  // Redirect if no summary is found
  useEffect(() => {
    if (!summary) {
      setRedirecting(true);
      let value = 0;
      const interval = setInterval(() => {
        value += 10;
        setProgress(Math.min(value, 90));
      }, 100);

      const timer = setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        router.replace("/dashboard");
      }, 1200);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [summary, router]);

  if (redirecting) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-emerald-100 via-teal-100 to-cyan-100 flex items-center justify-center">
        <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200">
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <Progress
              value={progress}
              className="w-2/3 h-4 bg-green-200 [&>div]:bg-green-600 transition-all duration-300"
            />
            <p className="text-green-700 font-medium text-lg">
              Redirecting to your dashboard...
            </p>
          </div>
        </BgGradient>
      </main>
    );
  }

  // Safely extract summary text whether it's a string or object
  const summaryText =
    typeof summary?.summary === "string"
      ? summary.summary
      : summary?.summary?.summary;

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-100 via-teal-100 to-cyan-100">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200">
        <div className="container mx-auto flex flex-col gap-10 py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Summary Details
          </h1>

          {summary ? (
            <Card className="bg-white rounded-2xl shadow-md p-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-rose-50">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {summary.fileName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(summary.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                {summaryText || "No summary available."}
              </div>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FileText className="w-12 h-12 text-green-600 mb-4" />
              <p className="text-gray-700 text-lg font-medium">
                Summary not found
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Redirecting you back to dashboard...
              </p>
            </div>
          )}
        </div>
      </BgGradient>
    </main>
  );
};

export default SummerizePage;