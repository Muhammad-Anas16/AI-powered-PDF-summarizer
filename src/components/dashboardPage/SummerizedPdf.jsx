"use client";

import { useEffect, useState } from "react";
import { generatePDF } from "@/lib/pdf";
import { FileText, Download } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SplitText from "../animation/SplitText";
import BlurText from "../animation/BlurText";

const SummarizedPdf = () => {
  const router = useRouter();
  const summeryData = useSelector((state) => state.summery.value);

  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(
    summeryData?.title || "Upload a PDF file first"
  );

  // Redirect if no data
  useEffect(() => {
    if (!summeryData || Object.keys(summeryData).length === 0) {
      router.replace("/dashboard");
    }
  }, [summeryData, router]);

  // Fetch AI summary from your API
  useEffect(() => {
    const getSummary = async () => {
      if (!summeryData?.text) return;

      setLoading(true);
      try {
        const res = await fetch("/api/openAi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Summarize the following text into one clear, engaging, and professional response. Keep it short, conversational, and focused only on the most important points.Avoid unnecessary symbols, dashes, or filler words. Return only the summary — nothing else. Text: ${summeryData.text}`,
          }),
        });

        const data = await res.json();
        if (data?.response?.content) {
          setAiSummary(data.response.content);
        } else {
          setAiSummary("⚠️ Failed to generate summary.");
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
        setAiSummary("⚠️ Error while summarizing.");
      } finally {
        setLoading(false);
      }
    };

    getSummary();
  }, [summeryData?.text]);

  // const handleDownload = () => {
  //   if (!aiSummary.trim()) return alert("No summary available to download!");
  //   generatePDF(aiSummary, fileName);
  // };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* File Name Input */}
      <div>
        <label className="block text-sm font-medium mb-1">Save as</label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* AI Summary Preview + Download */}
      {loading ? (
        <SplitText
          text="⏳ Your Summary is Generating Please wait... "
          className="text-2xl font-semibold text-center text-gray-500 italic"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      ) : aiSummary ? (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold">Summarized Text</h3>
            </div>
            {/* <button
              onClick={handleDownload}
              className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              <Download className="w-4 h-4 mr-1" /> Download
            </button> */}
          </div>
            <BlurText
              text={aiSummary}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-sm text-gray-700 whitespace-pre-line mb-8"
            />
        </div>
      ) : (
          <BlurText
            text="No Summary available yet Please Upload a Summery first."
            delay={150}
            animateBy="words"
            direction="top"
            className="text-sm text-gray-500 italic mb-8"
          />
      )}
    </div>
  );
};

export default SummarizedPdf;
