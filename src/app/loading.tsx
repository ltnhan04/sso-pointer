"use client";
import { Spinner } from "@/components/ui/spinner";
import React, { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-white flex items-center justify-center">
      <Spinner className="text-blue-500" size="small" />
    </div>
  );
}
