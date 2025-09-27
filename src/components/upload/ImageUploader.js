"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { extractTextFromImage } from "@/lib/imageToText";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import ExtractingLoader from "../common/Extractingloader";
import { setSummery } from "@/Redux/Summery/summerySlice";

const ImageUploader = () => {
  const [text, setText] = useState("");
  const [pages, setPages] = useState(0); // Only for PDFs
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleFile = async (file) => {
    if (!file) return;

    setLoading(true);
    setText("");
    setPages(0);

    try {
      if (file.type.startsWith("image/")) {
        const extractedText = await extractTextFromImage(file);
        setText(extractedText || "❌ No text found in the image");
        setFileName(file.name);
        toast.success("✅ Image text extracted!");
        dispatch(setSummery({ title: file.name, text: extractedText }));
        router.push('/SummerizePdf');
      } else {
        toast.error("❌ Unsupported file type (only Images allowed)");
      }
    } catch (err) {
      toast.error("⚠️ Error extracting content");
    }

    setLoading(false);
  };

  // Browse upload
  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  // Drag & Drop upload
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      className="border-2 border-dashed rounded-lg p-10 text-center mb-10"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="text-lg font-medium mb-2">Upload Your Image Document</h2>
      <p className="text-gray-500 mb-6">
        Drag and drop your Image here, or click to browse.
      </p>
      <div className="border-2 border-dashed rounded-lg py-12 px-6">
        <UploadCloud className="mx-auto mb-4 h-10 w-10 text-gray-400" />

        {fileName ? (
          <p className="text-green-600 font-medium mb-3">{fileName}</p>
        ) : (
          <p className="text-gray-500 mb-3">Drag & Drop Image Here</p>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          accept="application/pdf,image/*"
          id="fileUpload"
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor="fileUpload"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
        >
          {loading ? <ExtractingLoader /> : "Browse Files"}
        </label>
      </div>
    </div>
  );
}

export default ImageUploader;