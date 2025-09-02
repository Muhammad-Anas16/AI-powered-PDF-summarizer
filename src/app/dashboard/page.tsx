// "use client";

// import BgGradient from "@/components/common/BgGradient";
// import { Button } from "@/components/ui/button";
// import { RootState } from "@/redux/store";
// import { Plus, FileText, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setSummariesData } from "@/redux/slices/summarizeDataSlice";
// import { Progress } from "@/components/ui/progress"

// interface Summary {
//   _id: string;
//   fileName: string;
//   summary: string;
//   createdAt: string;
//   status?: string;
// }

// export default function DashboardPage() {
//   const dispatch = useDispatch();
//   const userId = useSelector((state: RootState) => state.user.userId);

//   const [summaries, setSummaries] = useState<Summary[]>([]);

//   useEffect(() => {
//     async function fetchSummaries() {
//       try {
//         const apiBase = (
//           process.env.NEXT_PUBLIC_API_BASE ||
//           "https://summerizer-api.vercel.app/"
//         ).replace(/\/$/, "");

//         const response = await axios.get(`${apiBase}/api/summary/${userId}`, {
//           headers: { "Content-Type": "application/json" },
//         });
//         if (response.data.success) {
//           dispatch(setSummariesData(response.data.data || ""));
//           setSummaries(response.data.data || []);
//         }
//       } catch (err) {
//         console.error("Error fetching summaries:", err);
//       }
//     }

//     if (userId) {
//       fetchSummaries();
//     }
//   }, [userId]);

//   // --- Delete Summary Function ---
//   async function deleteSummary(summaryId: string) {
//     try {
//       const apiBase = (
//         process.env.NEXT_PUBLIC_API_BASE || "https://summerizer-api.vercel.app/"
//       ).replace(/\/$/, "");

//       const response = await axios.delete(
//         `${apiBase}/api/summary/${summaryId}`,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       console.log("🗑️ API Delete Response:", response.data);
//       if (response.data.success) {
//         setSummaries((prev) => prev.filter((s) => s._id !== summaryId));
//       }
//     } catch (err) {
//       console.error("Error deleting summary:", err);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-emerald-100 via-teal-100 to-cyan-100">
//       <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200">
//         <div className="container mx-auto flex flex-col gap-10 py-12 px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
//                 Your Summaries
//               </h1>
//               <p className="mt-1 text-gray-600 text-sm sm:text-base">
//                 Transform your PDFs into concise, actionable insights ✨
//               </p>
//             </div>
//             <Button
//               asChild
//               className="rounded-2xl px-5 py-2 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 shadow-md hover:from-green-600 hover:to-green-800 hover:scale-105 transition-all duration-300"
//             >
//               <Link href="/upload" className="flex items-center gap-2">
//                 <Plus className="w-5 h-5" />
//                 New Summary
//               </Link>
//             </Button>
//           </div>

//           {/* Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//             {summaries.map((summary) => (
//               <Link
//                 href={`/summary/${summary._id}`}
//                 key={summary._id}
//                 className="group bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
//               >
//                 {/* Title & Time */}
//                 <div className="flex items-start gap-4">
//                   <div className="p-2 rounded-xl bg-rose-50 group-hover:bg-rose-100 transition">
//                     <FileText className="w-6 h-6 text-green-600" />
//                   </div>
//                   <div>
//                     <h2 className="font-semibold text-lg sm:text-xl text-gray-900">
//                       {summary.fileName}
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       {new Date(summary.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Status + Actions */}
//                 <div className="mt-6 flex items-center justify-end">
//                   <Button
//                     variant="destructive"
//                     size="icon"
//                     onClick={() => deleteSummary(summary._id)}
//                     className="hover:scale-110 transition-transform cursor-pointer"
//                   >
//                     <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </Button>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </BgGradient>
//     </main>
//   );
// }

"use client";

import BgGradient from "@/components/common/BgGradient";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { Plus, FileText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSummariesData } from "@/redux/slices/summarizeDataSlice";
import { Progress } from "@/components/ui/progress";

interface Summary {
  _id: string;
  fileName: string;
  summary: string;
  createdAt: string;
  status?: string;
}

export default function DashboardPage() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userId);

  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // <-- progress state

  useEffect(() => {
    async function fetchSummaries() {
      try {
        setLoading(true);
        setProgress(0);

        // Smoothly increase progress to ~90% while loading
        const interval = setInterval(() => {
          setProgress((old) => {
            if (old < 90) return old + 5;
            return old;
          });
        }, 200);

        const apiBase = (
          process.env.NEXT_PUBLIC_API_BASE ||
          "https://summerizer-api.vercel.app/"
        ).replace(/\/$/, "");

        const response = await axios.get(`${apiBase}/api/summary/${userId}`, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.data.success) {
          dispatch(setSummariesData(response.data.data || ""));
          setSummaries(response.data.data || []);
        }

        // Finish loader
        clearInterval(interval);
        setProgress(100);
      } catch (err) {
        console.error("Error fetching summaries:", err);
        setProgress(100);
      } finally {
        // small delay to let bar reach 100% smoothly
        setTimeout(() => setLoading(false), 300);
      }
    }

    if (userId) {
      fetchSummaries();
    }
  }, [userId, dispatch]);

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

          {/* Loader */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              {/* <Progress
                value={progress}
                className="w-2/3 h-4 bg-green-200 transition-all duration-300"
              /> */}
              <Progress
                value={progress}
                className="w-2/3 h-4 bg-green-200 [&>div]:bg-green-600 transition-all duration-300"
              />

              <p className="mt-4 text-green-700 font-medium text-lg">
                Loading your summaries...
              </p>
            </div>
          ) : summaries.length === 0 ? (
            // If no summaries
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FileText className="w-12 h-12 text-green-600 mb-4" />
              <p className="text-gray-700 text-lg font-medium">
                No summaries found
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Upload a PDF to get started!
              </p>
            </div>
          ) : (
            // Cards
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {summaries.map((summary) => (
                <Link
                  href={`/summerize/${summary._id}`}
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

                  {/* Status + Actions */}
                  <div className="mt-6 flex items-center justify-end">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault(); // prevent link navigation on delete
                        deleteSummary(summary._id);
                      }}
                      className="hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </BgGradient>
    </main>
  );
}
