"use client";

import { useLoader } from "@/components/common/loaderProvider";

export function useWithLoader() {
  const { setLoading } = useLoader();

  const withLoader = (state = false) => {
    setLoading(state);
  };

  return withLoader;
}
