"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadPdfAndExtractText } from "@/lib/pdfUploader";
import { toast } from "sonner";
import { useWithLoader } from "@/lib/withLoader";
import { setSummery } from "@/Redux/Summery/summerySlice";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import ExtractingLoader from "../common/Extractingloader";

function PdfUploader() {
  const [text, setText] = useState("");
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const withLoader = useWithLoader();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleFile = async (file) => {
    if (!file) return;

    setLoading(true);
    setText("");
    setPages(0);

    try {
      if (file.type === "application/pdf") {
        const { text, pages } = await uploadPdfAndExtractText(file);
        withLoader(true);
        setText(text || "❌ Failed to extract text");
        setPages(pages);
        setFileName(file.name);
        dispatch(setSummery({ title: file.name, text: text }));

        toast.success("✅ PDF uploaded and text extract successfully!");

        router.push('/SummerizePdf');
        
      } else {
        toast.error("❌ Unsupported file type (only PDF allowed)");
      }

    } catch (err) {
      toast.error("⚠️ Error extracting content");
    }

    withLoader(false);
    setLoading(false);
    handleClick();
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
      <h2 className="text-lg font-medium mb-2">Upload Your PDF Document</h2>
      <p className="text-gray-500 mb-6">
        Drag and drop your PDF here, or click to browse.
      </p>
      <div className="border-2 border-dashed rounded-lg py-12 px-6">
        <UploadCloud className="mx-auto mb-4 h-10 w-10 text-gray-400" />

        {fileName ? (
          <p className="text-green-600 font-medium mb-3">{fileName}</p>
        ) : (
          <p className="text-gray-500 mb-3">Drag & Drop Files Here</p>
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

export default PdfUploader;