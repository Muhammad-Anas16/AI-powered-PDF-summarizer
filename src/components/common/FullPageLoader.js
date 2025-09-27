"use client";

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

export default function FullPageLoader({ duration = 2000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <BarLoader color="#4285f4" width={200} />
    </div>
  );
}