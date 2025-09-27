"use client";

import React from "react";
import ImageUploader from "../upload/ImageUploader";


const ImageToTextUploader = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to your personalized summary hub!
      </p>
      <ImageUploader />
    </div>
  );
};

export default ImageToTextUploader;
