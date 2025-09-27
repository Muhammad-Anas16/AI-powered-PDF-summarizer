"use client";
import { createContext, useContext, useState } from "react";
import { BarLoader } from "react-spinners";

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <BarLoader color="#4285f4" width={200} />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
}

// custom hook
export function useLoader() {
  return useContext(LoaderContext);
}