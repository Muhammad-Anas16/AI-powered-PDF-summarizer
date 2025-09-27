"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Uploader from "@/components/dashboardPage/Uploader";
import Generated from "@/components/dashboardPage/Generated";
import Summaries from "@/components/dashboardPage/Summeries";
import ImageToTextUploader from "@/components/dashboardPage/ImageToTextUploader";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "getStarted";

  return (
    <main className="max-w-6xl mx-auto p-6">
      {section === "getStarted" && <Uploader />}
      {section === "generatePdfToText" && <Uploader />}
      {section === "generateImageToText" && <ImageToTextUploader />}
      {/* {section === "generatePdf" && <Generated />} */}
      {section === "summaries" && <Summaries />}
    </main>
  );
};

export default Dashboard;
