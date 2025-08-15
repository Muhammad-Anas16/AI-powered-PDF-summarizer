import React from "react";
import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

const UploadHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative [--p1] overflow-hidden rounded-full bg-gradient-to-r from-green-200 via-green-500 to-green-800 animate-gradient-x group">
        <Badge
          variant="secondary"
          className="relative px-6 py-2 text-base font-medium text-white rounded-full group-hover:bg-green-50 transition-colors cursor-pointer"
        >
          <Sparkles className="h-6 w-6 mr-2 text-green-600 animate-pulse" />
          <p className="text-green-400">AI-Powered Content Creation</p>
        </Badge>
      </div>
      <div className="font-bold py-4 text-2xl sm:text-3xl lg:text-4xl capitalize">
        start uploading{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDFs</span>
          <span
            className="absolute inset-0 bg-green-200/50 -rotate-2 rounded-full transform -skew-y-1"
            aria-hidden={"true"}
          >

          </span>
        </span>
      </div>
      <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
        <p>Upload your PDF and let our AI do the magic!</p>
      </div>
    </div>
  );
};

export default UploadHeader;
